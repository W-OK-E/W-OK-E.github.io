---
layout: post
title: "Estimating poses where we don't have them"
date: 2026-07-13 15:00:00
description: Understanding the intricate details behind SMAL.
tags: 3D, Mesh, ParametricModels
categories: Technical
---

## Start SMAL if you are confused
So, we have hit a problem - we want to learn a model that can generate meshes a single 2d image, however and I will tell you a secret, I do not really know if we REALLY HAVE TO GENERATE ONLY MESHES. Like in my mind - 3DGS is richer in fidelity than meshing and hence I would think that you would sort of like to really be able to generate life like images - but then I think that does not work well in downstream tasks - which in this case is medicine. Well, if you were thinking that too, I have some good news for you - the reason we use meshes in these scenarios is that a mesh offers detailed topology, allows us to measure volumes, surface areas etc. more accurately than a 3DGS would - which is more apt for the photorealism aspect of it, so for now we may just stick to meshing, we will see about 3d incorporation somewhere down the line.

So we will sort of look at the existing methods that are there in this space and then think of ways in which we can pick a few components from the different works and apply them to the model we are trying to develop. 

So the first in this class of models that you will see here is SMAL. Remember that the end goal is to be able to learn to predict a 3D mesh out of a 2d image - so it would be nice to sort of encode some 3d understanding about Quadrupeds in general into the model we are trying to build, so as part of the first step, we will take the objective of SMAL as generating horse meshes in such a way that when we project the joints etc. from the 3d mesh down to the image, the projection is as close as possible. Keep in mind that SMAL i.e. Skinned Multi Animal Linear model is designed for many Quadrupedal families and not just horses.

---

## Foundational Concepts: Kinematic Trees and Low-Dimensionality
The way the animal models are represented inside a computer is as a **Kinematic Tree** — which means each component of the body is represented as a node — so for instance the head is a node and we define how the other components are connected to it.

So, we say: The head node is present at $(x,y,z)$ - $(10,50,80)$ and the Neck is connected to the head by a joint of length $l$ and angle $\phi$. Where $l$ and $\phi$ dictate how the joint is positioned etc. 

Another thing to note is that most of the existing papers aim at learning a **low-dimensional shape model** — i.e. model learns only the necessary "controls" that would change the way a mesh would appear. For instance, say that in a standard mesh, we want to have 5000 vertices. Now, learning a low-dimensional space does not mean that the model learns to produce meshes with 4000 vertices or 3000. It simply means that the detail with which it can control the vertices reduces with reduction in dimension. So it will now just tweak 5 parameters instead of 10 but that will still change the 5000 vertices albeit not with the same level of detail that you would expect. A more mathematical way to think about this would be that the thousands of vertex movements are compressed into a small vector or PCA coefficients. As to the question of where PCA comes from and how it fits into the entire picture - we'll come to that don't worry.

---

## The 3D Pipeline: Registration and Initialization
So what is the idea here? We mentioned that we would like to incorporate some understanding of 3D geometry into our model, so we start off with some pre-existing 3D scans and a template mesh. Now, why a template mesh and what is it? So a template mesh is essentially a generic mesh structure (here of a Quadruped - specifically of a Lion) that we will start with and then try to wrap it around or "register" it with our pre-existing scan. Okay but why are we doing that? It is pretty intuitive, you have a bunch of scans of different animals and we want our model to "understand" so to say, how to construct the mesh of a given Quadruped. So when we register our template mesh across the multiple scans that we have - all the different ways in which the template mesh is modified for each registration lives in the transformations that were made and if we can somehow manage to extract only the right information from the transforms that were made, maybe we can teach the model a thing a two about working out new shapes.

And ofcourse, when it comes to extracting the important directions from an entire piece of dataset, we think of PCA. Now, I know that people usually associate PCA with being applied on a vector space, so let me talk you through a few details about the template mesh and also the registration process that would help deliver the point.

As you would know a mesh is essentially a collections of three things - `vertices`, `edges` and `faces`. Imagine taking a piece of cloth and drawing a shapes on with straight lines and corners. The shapes don't have to be triangluar or any specific mathematics shape, just straight lines and closed shapes. Now think of these millions of vertices having been stitched together in order to make that cloth, THAT IS A MESH! Essentially a continous surface made up of multiple vertices, edges and faces. So now you can imagine a mesh being a collection of vertices - Question is how do you define the vertices - easy! Since they are in 3d space, we should use x,y,z coordinates. 

Now you see, dividing our continous piece of cloth or mesh into a bunch of vertices we have added some modularity to it, but then we are ofcourse limited in terms of how much can we actually control here. A typical mesh of a Quadruped could have about 10,000 vertices and to manage the properties of all 10,000 of these separately is slightly impractical. So we group the vertices into "parts" of the mesh. The tail can group all of it's vertices together, similarly each of the limbs can have their own group etc. And so, this way end up with about 33 components of parts of the mesh so to say, so we only really have to control these 33 parts instead of the thousands of the vertices that the mesh is originally made up of.

But this does not really answer the question of where PCA is applied now does it? Well, for that we have to start with the actual registration process and walk through it:

So we have the template mesh - which we have nicely broken down into 33 components and a key idea from the SMAL paper is that when we are trying to fit the template to the Scan — we make sure that the template being fit is as close as possible to the actual scan but also follows a few constraints. Now, when I say fit, I mean wrap as nicely as possible around the given scan - while following a certain constraints. We can think of them as two strings pulling on the horse template — one that is forcing the template to fit as closely as possible to the scan and the other that is also asking it to be as close as possible template mesh that we have here of a Lioness. Why stay close to the template mesh and all -  we will come to that step in a bit, and we will also answer the PCA question.

Now we need a decent starting point (to avoid issues where one leg in the template accidentally matches the wrong leg in the scan). In the SMAL paper, the initial placement of the template is made based on how far the **median of the template** is from the **median of the scan**. We get them both together so that the **registration** process can be a bit smoother. Remember that registration is essentially the movement of the template towards the actual scan in order for the template to fit the scan.

---

## Coarse-to-Fine: GLoSS and Global Topology
The template mesh mesh SMAL uses (GLoSS) connects different body parts using stitch points. For example, where the neck and head connect, there are duplicate vertices — this is simply to ensure that during the initial registration the template mesh does not tear.

If we have a scan of a giraffe and a template mesh:
1. Move the template closer based on the median of all the vertices in the both the scans.
2. **GLoSS Shape Step**: Because each part of the GLoSS shape space is separate, they can easily be stretched or squished to the right dimensions (like a long neck).
3. **Topology Transition**: Once done, the GLoSS mesh switches from a "Part-based" Topology to a "Global" Topology where the interface points are no longer duplicated.


The template mesh is further optimized using the **data term** and the **As-Rigid-As-Possible (ARAP)** term. The data term is a combination of Euclidean distance and the **Geman-McClure Robust Error Function**.

---

## Technical Deep Dive: Shape Deformation Space
This is the **GLoSS Shape Step** that we glossed over in the last section and this is where all the transformations happen. So we saw that the template mesh is made of 33 parts. The deformation/scaling is defined separately for each part so that changes in one don't affect others. So now, if we were trying to fit the GLoSS template mesh to that of a Giraffe, it would work as follows:
1. To change the shape, you transform each vertex.
2. Group vertices by body part (e.g., all neck vertices).
3. We use **7-dimensional space vectors** for each part: [Scale, Scale-X, Scale-Y, Scale-Z, Stretch-X, Stretch-Y, Stretch-Z]. These are just coefficients deciding how much of that transformation has to be applied to the collection of vectors.
4. So naturally, we think - if those are just the coefficients, where are the actual transformations? Well. they are defined in the **Basis Matrix**. Also, as you will find, the transforms that we work with here are relatively simpler than a full-fledged matrix multiplication transformation that we usually do. For instance:

Let's say we have two vertices as follows - [1,2,0] & [-1,3,5] (x,y,z) format and the goal here is to move these two vertices to a new location in such a way which would be equivalent to applying a transformation. So maybe the transformation of stretching the template's neck to be that of a Giraffe involves taking the vertices to [1,2,5] & [-3,3,6] - the most straightforward way of trying to do that would be to just notice the delta between the two which is [0,0,5] & [-2,0,1] and then add those two deltas to the original coordinates. We don't care whether we get the deltas directly from a matrix multiplication or not. 

So, our Basis matrix here is as follows:
```bash
[[1,1,0,0,0,2,0], #Deals with the x coordinate of the first vertex, handles scaling in x, also *stretch along x
 [2,0,1,0,1,0,0], #Deals with the y coordinate of the first vertex, handles scaling in y, also *stretch along y 
 [0,0,0,1,1,2,0], #Deals with the x coordinate of the first vertex, handles scaling in x, also *stretch along x
 [-1,1,0,1,0,3,5], #Deals with the x coordinate of the second vertex, handles scaling in x, also *stretch along x
 [3,0,1,0,-1,0,5], #Deals with the y coordinate of the second vertex, handles scaling in y, also *stretch along y
 [5,0,0,1,-1,3,0]]  #Deals with the z coordinate of the second vertex, handles scaling in z, also *stretch along z
```
You would have noticed that the Basis matrix has a dedicated row for each coordinate of each vertex. If you remember, the Space vector that defines how much each transformation is applied to the vertices is given by [Scale, Scale-X, Scale-Y, Scale-Z, Stretch-X, Stretch-Y, Stretch-Z], and if you understand how matrix multiplications work, the result of this Basis Matrix being multiplied with the space produces a single 7-D vector that would look something like:
```bash
[Scale + Scale-X + 2 × Stretch-Y,
2 × Scale + Scale-Y + Stretch-X,
Scale-Z + Stretch-X + 2 × Stretch-Y,
−Scale + Scale-X + Scale-Z + 3 × Stretch-Y + 5 × Stretch-Z,
3 × Scale + Scale-Y − Stretch-X + 5 × Stretch-Z,
5 × Scale + Scale-Z − Stretch-X + 3 × Stretch-Y]
```

Which could then be nicely interpreted as - we are looking at each coordinate then the change that happens in the coord is influenced by it's actual value first (this is to ensure that every transformation is consistent with the actual coordiantes of the vertices) and then each of the term(scale, stretch) gets added to it, depending upon what the coefficients defined in the 7-D vector was. Notice that we have not dealt with rotation in the basis matrix here, that is dealt elsewhere.

So once the registration for all the meshes is done, we have essentially positioned all the vertices in places that are ideal for those scans. Each mesh essentially is a vector of vertices [(x1,y1,z1),(x2,y2,z2)...] and we can flatten it just as we did in the case of applying the Basis Matrix to be: [x1,y1,z1,x2,y2,z2...] - which is our vector containing all the vertices for a single mesh, to apply PCA we simply stack the vectors for all the meshes as rows in a matrix to get something like:

| Mesh# | Coord 1 (x) | Coord 1 (y) | Coord 1 (z) | Coord 2 (x) | ... |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 0.5 | 1.2 | 0.8 | 0.6 | ... |
| 2 | 0.7 | 1.1 | 0.9 | 0.8 | ... |
| 3 | 0.3 | 0.9 | 1.2 | 0.4 | ... |
| ... | ... | ... | ... | ... | ... |

Each row is a **vector** of length $3V$ (all vertex coordinates flattened). What PCA does is to find the directions of maximum variance in this 41-row, $3V$-column matrix. Now I know it is sort of hard to actually get an intuition for it, but the principal components tell you that out of all the scans we just wrapped with scans, which region required the most wraps. i.e. if the animals we were dealing with very tall, the answer would be the Z-axis. Similarly for fat animals, it would somewhere in the 2d plane. But ofcourse it does not mean that we didn't wrap in other directions at all. We did, just a tad bit less, that direction is also promising yes, but for animals all too tall, not as much as the axis encoding height (remember which does not have to be Z axis all the time). How would this be helpful then you ask? Well, PCA gives us multiple things - the mean ($\mu$) scan as well as the principal components/directions in which there is the most variation, soooo to generate a new mesh now, we can technically just do: $\mu$ + $\sum \beta_i \cdot PC_i$. Where:
$\mu$ is the mean scan that we have learned, PC_i is the i^(th) principle component each of which encodes various features like height, width etc as we saw above and $\beta_i$ are the coefficients that we choose for each principle component. So it's like we start off with an average scan and then keep adding the requried change via the Principal components controlling it precisely with the $\beta$ coefficients. So you see, in the end what we control are these $\beta$ parameters to indicate how much of each direction do we want in our scan that is getting generated.


All of the above more or less captures how the shape space of the mesh changes with different scans that we have with us, but there's another aspect of learning meshes that we should look at:

---

## Pose Deformation Space
The **Shape Space** described how individual portions of the template mesh would deform/change to "fit" to the given scan, the **Pose Space** describes how the mesh changes when the animal moves (e.g., muscle bulges when running)

Unlike shape deformation, there is no **analytical solution** here. It is difficult to give a single mathematical equation to explain how a mesh changes as an animal shifts poses without getting crumpled. So what we end up doing here is animating the GLoSS template mesh to move in several poses, and then capturing the location of the vertices in the mesh at different instances, and then performing PCA on them, which allows us to capture what direction in the pose space do the vertices vary the most when doing that pose. We have a basis vector in this space too, but that is not predefined unlike in the Shape space. These values are learned from the data, and the shape is similar (3n x n_d) where n_d is the number of pose characteristics we end up caring about just like there were 7 factors (scale,scale_x,y,z etc.) in the shape space, and we are also able to obtain which areas (knees, abdomen etc.) have the highest variation in terms of poses i.e. the ones that change the most when an animal is chaning poses.

## Final refinements and transition to SMAL
The GLoSS based registration where we adjust the shape and the pose of the GLoSS templates gives a good initial registration. However you can imagine we have not really tightly wrapped the template mesh around the given scan, it's just covering it, we want it to start resembling the scan, so we start off by first converting the template GLoSS mesh from it's part based topology to a full continous topology i.e. we remove the duplicate vertices between each part of the mesh and it becomes a single continous surface and then further optimize the mesh surface to be closer to the actual scan via another step of optimization which we briefly touched upon earlier. The two strings analogy fits well here - where we are trying to fit the template mesh as closely as possible to the scan and also making sure it does not wander too far away from the GLoSS template mesh.

The above steps produce a pretty good registration. Good enough that we can now proceed to build and generate the final SMAL model. And when we are buiilding the model, we would like to focus on step by step learning i.e. first up we would like to just understand and learn how each animal differs in **shape**. What that means is that we want the model to learn how is a Lion different from a Zebra before we start to learn how "walking" is different from "Sitting". 

Now, I think you would agree that any random Mathematical model or an untrained Neural Network is too dumb to understand that a galloping Zebra and a Zebra are not two different animals and if not checked properly, it may just end up learning them as two different things!! Therefore a requirement of developing the SMAL model is that all the scans we get to work with have the same neutral pose so that the model does not end up associating a folded leg as being a part of the biology of the organism.

Well then the question is how do we obtain a coherent pose across all the scans we have? It's pretty simple actually - in order to move from the template mesh to the scan, we applied a bunch of transformations, now what we want to do is just to "undo" the pose changes while keeping the shape changes consistent. And this is done via **Linear Blend Skinning** a.k.a (**LBS**). To be very precise, imagine you have a vertex and you want to model how the position of the vertex will change as we will transform the joints that are surrounding the vertex. The way we find that is this:
1. If the vertex is influenced by only a single joint, then we have no issues, we can just directly transform the vertex to a target location based on how our single joint is moving.
2. But, if the vertex is influenced by multiple joints, we need to assign weights - weights that dictate how much of an influence one joint has over the vertex's position. We usually use normalized weights which means that all of them must add up to 1.
3. So, the way it works is pretty simple - first we treat the point as if it is just being transformed by one of the joints and the other joint has no influence on it whatsoever. Then we repeat the same thing for the other joints. And once we have the transformed position of the vertex for each of the joint, we just take the weighted average of all of these points to obtain the actual transformed location of the point. 

#NOTE - There is an additional little detail about Linear Blend skinning that we have skipped here - something about where the transformation is actually applied to the vertices, but they are not crucial for building an intuition for this.

So we normalize all our meshes to be in a similar pose using LBS, and then force it to be symmetric by mirroring the vertices - this is essentially done to ensure that the model does not learn assymetry as part of the biology of the organism. And of course, as you would have guessed by now, we apply PCA again to all the meshes to model the statistics of the shape variation. This gives us the mean shape that we should stick to and also the directions which we should vary parameters, in order to move from one animal to the other.
---

## Measuring Poses: GMMs and Priors
Articulation is an optimization problem minimizing:
- The **Reprojection Error**
- The **Pose Prior Error**

Pose priors check if a configuration is valid (e.g., [Arm: 20°, Shoulder: 30°]). One way to check this is a **Gaussian Mixture Model (GMM)**. We train Gaussian distributions to fit pose data (one cluster for standing, one for sitting). However, SMAL just uses the standard Mahalanobis distance. 

We check how far our pose "point" is from the center of these Gaussian "clouds." A **diagonal covariance matrix** means the features (joint angles) are assumed to be independent (This was an interesting fact that I realized I knew but never paid attention to!!). So we have nice way of knowing whether a particular mesh being fit to is in accordance with the pose prior or not.

So overall, with all the tricks that we applied above, There are two tasks at hand:
1. **3D Repair**: Wrapping a template around a noisy/broken 3D scan.
2. **2D-to-3D**: Generating 3D poses from 2D images. 

In the second task, we don't have a 3D surface. We must mold the template so that its **reprojection** (silhouette and keypoints) onto the 2D image is as close as possible. This involves error functions comparing the projection to the reference image and we then have a model that can generate 3D meshes/models straight from 2d images.
