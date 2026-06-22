#!/usr/bin/env python3
import os
import re
import urllib.request
import yaml

PROJECTS_DIR = "_projects"
REPOS_DATA = "_data/repositories.yml"

def rewrite_image_urls(content, repo_url):
    """
    Rewrites relative image URLs in markdown to absolute GitHub raw URLs.
    Example: [alt](images/pic.png) -> [alt](https://raw.githubusercontent.com/user/repo/main/images/pic.png)
    """
    # Extract user/repo from https://github.com/user/repo
    match = re.search(r"github\.com/([^/]+)/([^/]+)", repo_url)
    if not match:
        return content
    
    user, repo = match.groups()
    base_raw_url = f"https://raw.githubusercontent.com/{user}/{repo}/main"
    
    # Match markdown images: ![alt](path)
    # This regex looks for paths that don't start with http, /, or #
    def replace_markdown_url(match):
        alt = match.group(1)
        url = match.group(2)
        if not (url.startswith("http") or url.startswith("/") or url.startswith("#")):
            return f"![{alt}]({base_raw_url}/{url})"
        return match.group(0)

    content = re.sub(r"!\[(.*?)\]\((.*?)\)", replace_markdown_url, content)

    # Match HTML images: <img ... src="path" ... />
    def replace_html_url(match):
        prefix = match.group(1)
        url = match.group(2)
        suffix = match.group(3)
        if not (url.startswith("http") or url.startswith("/") or url.startswith("#")):
            return f'<img{prefix}src="{base_raw_url}/{url}"{suffix}'
        return match.group(0)

    content = re.sub(r"<img([^>]*?)src=\"(.*?)\"([^>]*?)", replace_html_url, content)

    # Match markdown links: [text](path.md)
    def replace_md_link(match):
        text = match.group(1)
        url = match.group(2)
        if url.endswith(".md") and not (url.startswith("http") or url.startswith("/") or url.startswith("#")):
            # Clean up ./ if present
            clean_url = url.lstrip("./")
            # Use /blob/ for documentation links
            blob_url = f"https://github.com/{user}/{repo}/blob/main"
            return f"[{text}]({blob_url}/{clean_url})"
        return match.group(0)

    content = re.sub(r"\[(.*?)\]\(((?!\!).*?)\)", replace_md_link, content)
    
    return content

def sync_readmes():
    if not os.path.exists(PROJECTS_DIR):
        print(f"Error: {PROJECTS_DIR} not found.")
        return

    for filename in os.listdir(PROJECTS_DIR):
        if not filename.endswith(".md"):
            continue
        
        filepath = os.path.join(PROJECTS_DIR, filename)
        with open(filepath, 'r') as f:
            lines = f.readlines()
        
        # Parse frontmatter
        if not lines[0].startswith("---"):
            continue
            
        try:
            end_frontmatter = lines.index("---\n", 1)
        except ValueError:
            continue
            
        frontmatter_str = "".join(lines[1:end_frontmatter])
        metadata = yaml.safe_load(frontmatter_str)
        
        repo_url = metadata.get("github")
        if not repo_url:
            print(f"Skipping {filename}: No 'github' URL in frontmatter.")
            continue
            
        # Construct raw README URL
        # We assume 'main' branch for simplicity. We could try 'master' if 'main' fails.
        user_repo = repo_url.replace("https://github.com/", "")
        readme_url = f"https://raw.githubusercontent.com/{user_repo}/main/README.md"
        
        print(f"Fetching README for {user_repo}...")
        try:
            with urllib.request.urlopen(readme_url) as response:
                readme_content = response.read().decode('utf-8')
        except Exception as e:
            # Try master if main fails
            readme_url = f"https://raw.githubusercontent.com/{user_repo}/master/README.md"
            try:
                with urllib.request.urlopen(readme_url) as response:
                    readme_content = response.read().decode('utf-8')
            except Exception as e2:
                print(f"Failed to fetch README for {user_repo}: {e2}")
                continue

        # Rewrite image URLs
        readme_content = rewrite_image_urls(readme_content, repo_url)
        
        # Extract first image as thumbnail
        # Try markdown first: ![alt](url)
        img_match = re.search(r"!\[.*?\]\((.*?)\)", readme_content)
        if not img_match:
            # Try HTML: <img ... src="url" ... />
            img_match = re.search(r"<img[^>]*?src=\"(.*?)\"", readme_content)
        
        if img_match:
            first_img = img_match.group(1)
            metadata['img'] = first_img
            # Add avoid_scaling: true for remote images to prevent imagemagick errors
            metadata['avoid_scaling'] = True
            print(f"Set thumbnail to {first_img}")
        
        # Prepare new frontmatter
        new_frontmatter_str = yaml.dump(metadata, sort_keys=False)
        
        # Prepare new content: preserve frontmatter, append README content
        new_content = "---\n" + new_frontmatter_str + "---\n\n" + readme_content
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    sync_readmes()
