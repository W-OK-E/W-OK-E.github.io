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
        },{id: "nav-projects",
          title: "projects",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-repositories",
          title: "Repositories",
          description: "A sneak-peek into my Github",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "post-branch-prediction-from-cpus-to-gpus-and-tpus",
        
          title: "Branch Prediction: From CPUs to GPUs and TPUs",
        
        description: "Exploring the evolution of branch prediction and parallel execution across CPU, GPU, and TPU architectures.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/asics/";
          
        },
      },{id: "post-keeping-a-secret-from-agents",
        
          title: "Keeping a secret from Agents!",
        
        description: "Quick Dive into SREGym - the evaluation benchmark for agents deployed in SRE settings.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/sregym-rfc2/";
          
        },
      },{id: "post-ult-unifying-teacher-student-rl-with-transformers",
        
          title: "ULT: Unifying Teacher-Student RL with Transformers",
        
        description: "A deep dive into the ULT paper and how it replaces split teacher-student policies with a single unified transformer architecture for RL.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/ult/";
          
        },
      },{id: "post-breaking-down-sregym",
        
          title: "Breaking down SREGym!",
        
        description: "Quick Dive into SREGym - the evaluation benchmark for agents deployed in SRE settings.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/sregym/";
          
        },
      },{id: "post-let-39-s-paint-shall-we",
        
          title: "Let&#39;s Paint! Shall we?.",
        
        description: "A primer on 3DGS.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/3dgs/";
          
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
      },{id: "books-the-code-breaker",
          title: 'The Code Breaker',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/breaking_code/";
            },},{id: "books-the-da-vinci-code",
          title: 'The Da Vinci Code',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/davinci_code/";
            },},{id: "books-digital-minimalism",
          title: 'Digital Minimalism',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/digital_minimalism/";
            },},{id: "books-the-emperor-of-all-maladies",
          title: 'The Emperor of All Maladies',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/emp_Maladies/";
            },},{id: "books-project-hail-mary",
          title: 'Project Hail Mary',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/hail_mary/";
            },},{id: "books-a-hunger-artist",
          title: 'A Hunger Artist',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/hunger_artist/";
            },},{id: "books-losing-my-virginity",
          title: 'Losing My Virginity',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/losing-my-virginity/";
            },},{id: "books-introduction-to-machine-learning-systems",
          title: 'Introduction to Machine Learning Systems',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/ml-systems/";
            },},{id: "books-notes-from-the-underground",
          title: 'Notes from the Underground',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/notes_underground/";
            },},{id: "books-the-singapore-story",
          title: 'The Singapore Story',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/singapore-story/";
            },},{id: "books-space-barons",
          title: 'Space Barons',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/space_barons/";
            },},{id: "books-thinking-fast-and-slow",
          title: 'Thinking, Fast and Slow',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/think_fast_slow/";
            },},{id: "news-we-have-secured-1st-place-in-project-implementation-and-management-category-at-the-international-space-drone-challenge-held-at-bits-pilani-k-k-birla-goa-campus-and-4th-place-overall",
          title: 'We have secured 1st place in Project Implementation and Management category at the...',
          description: "",
          section: "News",},{id: "news-joined-niser-bhubaneswar-as-a-summer-research-intern-working-on-3d-reconstruction-and-gaussian-splatting-floater-removal-pipelines",
          title: 'Joined NISER Bhubaneswar as a Summer Research Intern working on 3D Reconstruction and...',
          description: "",
          section: "News",},{id: "news-our-team-project-manas-achieved-3rd-place-globally-at-the-igvc-2025-usa-autonav-driverless-challenge-proud-to-have-contributed-to-the-perception-and-navigation-stack",
          title: 'Our team, Project MANAS, achieved 3rd place globally at the IGVC 2025 (USA)...',
          description: "",
          section: "News",},{id: "news-exciting-news-i-will-be-joining-the-max-planck-institute-for-intelligent-systems-in-tübingen-germany-as-a-research-intern-i-have-also-taken-on-the-role-of-expansion-manager-for-the-tübingen-chapter-of-degis",
          title: 'Exciting news! I will be joining the Max Planck Institute for Intelligent Systems...',
          description: "",
          section: "News",},{id: "projects-gem-tender-automation",
          title: 'GeM Tender Automation',
          description: "Automated government tender submissions using Selenium.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/10_tender/";
            },},{id: "projects-unitree-gov2-mujoco-rl-mjx",
          title: 'Unitree Gov2 Mujoco RL (MJX)',
          description: "Unitree Go2 MuJoCo simulations ported to XLA for massive RL training speedups.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_mjx_rl/";
            },},{id: "projects-medical-imaging-foundation-model",
          title: 'Medical Imaging Foundation Model',
          description: "A multi-task, multi-modal foundation model for medical image segmentation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_foundation_model/";
            },},{id: "projects-igvc-2025-project-manas",
          title: 'IGVC 2025 (Project MANAS)',
          description: "Software stack for our 3rd-place global autonomous ground vehicle at IGVC 2025.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_igvc/";
            },},{id: "projects-isdc-2025-project-manas",
          title: 'ISDC 2025 (Project MANAS)',
          description: "Perception stack for our autonomous aerial vehicle - 1st Place among drones.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_isdc/";
            },},{id: "projects-eliteus-super-resolution",
          title: 'EliteUS (Super-Resolution)',
          description: "Lightweight arbitrary-scale super-resolution model for ultrasonography.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_eliteus/";
            },},{id: "projects-gurukul-tutoring-site",
          title: 'Gurukul (Tutoring Site)',
          description: "Full-stack tutoring platform built with Next.js and Supabase.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_gurukul/";
            },},{
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
          window.open("https://instagram.com/its_ok_yk", "_blank");
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
