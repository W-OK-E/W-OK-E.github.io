---
layout: default
title: "Home"
---

<h2>Blog Posts</h2>

<ul>
  {% for post in site.posts %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul>
