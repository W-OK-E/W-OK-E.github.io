---
layout: post
title: A simple and intuitive guide to using uv - the new king of python tooling!
date: 2025-10-26 18:00:00
description: Quick Dive into Byte Pair Encoding tokenizers.
tags: Computer Vision, OpenCV
categories: Posts
chart:
  plotly: true
---
## Step 1 - Setting up uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Step 2 - Setting up a simple environment in uv and reproducing it
Clone the repo:
```bash
git clone https://github.com/W-OK-E/UWe.git
```

This repo follows the following folder structure:
```bash
UWe
|---UWe is the Parent project with some deps 
|
----chimera
|   |
|   -----It has non-conflicting deps with the parent folder
|---hunter
|   |
|   -----It's dependencies are conflicting with the parent folder
|---sapphire
|   |
|   -----It's dependencies are conflicting with the parent folder but not folder chimera
```

Each folder is designed to demonstrate the effectiveness of uv in isloating and manageing environments at lightning speed. But first we will start with a simple environment creation.
Initialize a uv project in the root of the repo

```bash
uv init

```

The command basically creates a .lock file and a .toml file which track the dependencies of your project.

**Install the dependencies**
There are two ways in which this can be done

1. Safe way
```bash
uv add -r base_requirements.txt
```
This command installs the dependencies in a .venv folder in the same directory, while also adding it to the .toml and .lock files so that we can keep track of the installed packages.

2. Installation with no tracking
```bash
uv pip install -r base_requirements.txt
```
The above command will only install the package in the .venv folder without adding it to the .toml and .lock files.

Now it might not make much sense but let's test what each of those methods mean for your projects:

## The Safe Way
Once you have installed base_requirements.txt via the Safe Way, go ahead and remove the .venv in the root of your project:
```bash
rm -rf .venv
```
This removes all the installed packages. Now run:
```bash
uv run tests.py
```
tests.py just imports a few packages to test the environment. What uv does now is, before running the script it checks the .lock and .toml files for what packages should be present in the environment, and automatically installs them without you having to explicitly mention it. Magic!! 
Which means that if you have installed the dependencies via the first method and someone else where to clone the repo, they won't need to follow a tedious environment setup, they can just proceeed to run the relevant files and the packages are automatically installed.

## The Direct way
First remove all the config files by running:
```bash
rm -rf .venv uv.lock pyproject.toml 
```
Initialize the project
```bash
uv init
```
Now a crucial aspect of trying to run `uv pip install -r base_requirements.txt`, is that you need to initialize the project and create a .venv by running:
```bash
uv venv
```
- If you donot run `uv init` uv will start using any environment it finds which will be disastrous
- If you donot run `uv venv` uv won't know where to pip install the requirements.

Once that is done, install deps via:
```bash
uv pip install -r base_requirements.txt
```
This time the packages won't be tracked by .toml or .lock files so when you do:
```bash
rm -rf .venv
```
And run:
```bash
uv run tests.py
```
You will get an error saying package not found, because uv doesn't know what deps it needs to install.

That completes everything about setting up a basic uv environment

## Managing Sub-projects

Now let's see the following cases:
1. If you have sub-projects inside your project that have non-conflicting dependencies with the parent project.
2. If you have sub-projects with conflicting deps with the parent project
3. If you have a sub-project which has conflicitng deps with th parent project but can work with the deps of some other sub-project.

### Case-1 
So this is the easiest scenario, the sub-folder chimera has deps which donot conflict with that of the parent folder, so we can just do:
```bash
cd chimera
uv init #Optional
uv add -r requirements.txt
```
The deps for chimera donot conflict with that of the parent project so the packages will get installed to the `../.venv` folder and the packages will get added to the `../uv.lock` and `../pyproject.toml`

### Case-2
The deps in the hunter folder are incompatible with that of the parent project so if you:
```bash
cd hunter
uv add -r requirements.txt
```
You will get the following error:
```bash
  × No solution found when resolving dependencies:
  ╰─▶ Because requests==2.28.2 depends on urllib3>=1.21.1,<1.27 and your project depends on requests==2.28.2, we can conclude that your
      project depends on urllib3>=1.21.1,<1.27.
      And because your project depends on urllib3==2.2.0, we can conclude that your project's requirements are unsatisfiable.
  help: If you want to add the package regardless of the failed resolution, provide the `--frozen` flag to skip locking and syncing.
```
Now the following things are **not recommended**:
1. Doing a frozen install as the error suggests, it will be very hard to reproduce the environment later
2. Running `uv pip install -r requirements.txt` - This will install the package to ../.venv without any syncing or locking, and will remove the parent folder's package version. And everytime depending upon where you run a script from the package will swing between two versions because it will keep looking at the .toml that has the parent folder's deps. And if you run the a script in hunter that requires `urllib3==2.2.0`, it will give you an error.

**Recommended**:
```bash
cd hunter
uv init --no-worskpace
uv add -r requirements.txt
```
This will start treating the `hunter/` folder as a separate project.**If you run `uv init` without the `--no-workspace`, it will start treating `hunter` as a member of the parent workspace and give the same errors as above. Things to take care in this setup:
1. If you want to run some script in the `hunter/` folder you must run it from that folder because uv looks up the immediate environment setup. So it uses the closest interpreter is used. Which means int he folder structure:
```bash
UWe
|
.venv
tests.py
----chimera
|   |
|   -----It has some dependencies
|   hunter
|   |
|   .venv
|    tests.py
```
If you run tests.py in the hunter folder from the parent folder it uses the packages in the parent folder's .venv. So to use hunter's venv you must:
- either run it from the hunter folder
- or activate the hunter virtual environment via:
```bash
source hunter/.venv/bin/activate
```
And when running scripts, you will need to pass the `--active` flag:
```bash
uv run --active hunter/tests.py
```

### Case-3
The deps in the sapphire folder conflict with the parent folder but are compatible with the deps of hunter/ folder, so you can use hunter's environment globally but you will need to pass the `active` flag everytime:
```bash
source hunter/.venv/bin/activate
```
Then whatever you run a script pass the `--active` flag as:
```bash
source hunter/.venv/bin/activate
uv run --active sapphire/tests.py 
```

****************************************************
This covers almost all of the intricate cases you might face while using uv, please note that while uv can completely replace pip, conda is still better in some cases, especially when your project has non-pythonic dependencies. For more details please head over to the documentation, it's super cool - https://docs.astral.sh/uv/
****************************************************
