// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-bookshelf",
          title: "bookshelf",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/books/";
          },
        },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "A sneak-peek into my Github",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "post-a-simple-and-intuitive-guide-to-using-uv-an-awesome-tool-from-astral",
        
          title: "A simple and intuitive guide to using uv - an awesome tool from...",
        
        description: "Quick Dive into Byte Pair Encoding tokenizers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/uv_tutorial/";
          
        },
      },{id: "post-a-quick-overview-of-byte-pair-encoding-tokenizers",
        
          title: "A quick overview of Byte Pair Encoding tokenizers!",
        
        description: "Quick Dive into Byte Pair Encoding tokenizers.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/bpe_short/";
          
        },
      },{id: "post-delegation-discomfort-and-decisions",
        
          title: "Delegation, Discomfort and Decisions!",
        
        description: "It&#39;s so easy to get lost in othe&#39;s thoughts or even our own ideas, is there a way to take this up? And why should we worry about whether",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/onurown/";
          
        },
      },{id: "post-watch-and-learn-forget-the-speech",
        
          title: "Watch and Learn, forget the speech!",
        
        description: "The best way to learn something is to imitate the actor.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/saycan/";
          
        },
      },{id: "post-lights-language-camera-action",
        
          title: "Lights❌ Language✅ Camera...Action",
        
        description: "Deep Dive into the Quar-VLA paper",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/quarv/";
          
        },
      },{id: "post-your-dog-can-sniff-mine-scans",
        
          title: "Your dog can sniff, mine scans...",
        
        description: "Well, it was time I made our dog smarter, afterall the LLMs are tasked to do that aren&#39;t they?",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/quad/";
          
        },
      },{id: "post-pictures-of-the-unseen",
        
          title: "Pictures of the Unseen...",
        
        description: "A short description of how we aim to improve 3D reconstruction using Diffusion Priors.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/difix/";
          
        },
      },{id: "post-is-cancer-modern-or-retro-gt-lt",
        
          title: "Is Cancer Modern or Retro &gt;_&lt; ?",
        
        description: "A teensy tiny story from our everlasting battle with cancer.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/cancer/";
          
        },
      },{id: "post-the-flow-of-generative-networks",
        
          title: "The flow of Generative Networks",
        
        description: "A brief intro to Graph Neural Networks",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/gnn/";
          
        },
      },{id: "post-track-me-if-you-can",
        
          title: "Track me if you can!",
        
        description: "Simple Ball Tracking using hsv",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2024/balltracking/";
          
        },
      },{id: "books-the-emperor-of-all-maladies",
          title: 'The Emperor of All Maladies',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/emp_Maladies/";
            },},{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%6F%6B%68%65%72%65%32%31@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/W-OK-E", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/w_ok_e18", "_blank");
        },
      },{
        id: 'social-kaggle',
        title: 'Kaggle',
        section: 'Socials',
        handler: () => {
          window.open("https://www.kaggle.com/omkumarkag", "_blank");
        },
      },{
        id: 'social-pinterest',
        title: 'Pinterest',
        section: 'Socials',
        handler: () => {
          window.open("https://www.pinterest.com/okhere21/_pins/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
