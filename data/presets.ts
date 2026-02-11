import { MockUps } from "@/zod/schema";
import { DefaultSlide } from "@/data/default-slide";

const background = [
  "https://imgs.search.brave.com/DZ92MZ80cbiZjMKg4-q9xnlCCL2JYSUdRANdPqiMrGw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MDE2MjQwNzU5NjIt/MDA3ODMzZGYxYWVl/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZhdXRv/PWZvcm1hdCZmaXQ9/Y3JvcCZpeGxpYj1y/Yi00LjEuMCZpeGlk/PU0zd3hNakEzZkRC/OE1IeHpaV0Z5WTJo/OE1UWjhmR1JsYm5O/bEpUSXdabTl5WlhO/MGZHVnVmREI4ZkRC/OGZId3c",
  "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
];

const font = ["lotion", "sans-serif", "serif"];
const border = ["border-center", "border-thick", "border-dashed"];
const shadow = ["right", "left", "top", "bottom"];

export const presets: MockUps = [
  {
    id: "default",
    nickname: "default",
    name: "Default Preset",
    slides: [
      {
        id: "slide1",
        component: DefaultSlide,
        componentName: "DefaultSlide",
        data: {
          logo: "https://example.com/logo.png",
          heading: "Chat with your data and get instant answers",
          description: "How can I increase my average order value?",
          media:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        },
        style: {
          backgroundImage:
            "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
        },
      },
      {
        id: "slide1",
        component: DefaultSlide,
        componentName: "DefaultSlide",
        data: {
          logo: "https://example.com/logo.png",
          heading: "Chat with your data and get instant answers",
          description: "How can I increase my average order value?",
          media:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        },
        style: {
          backgroundImage:
            "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
        },
      },
      {
        id: "slide1",
        component: DefaultSlide,
        componentName: "DefaultSlide",
        data: {
          logo: "https://example.com/logo.png",
          heading: "Chat with your data and get instant answers",
          description: "How can I increase my average order value?",
          media:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        },
        style: {
          backgroundImage:
            "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
        },
      },
      {
        id: "slide1",
        component: DefaultSlide,
        componentName: "DefaultSlide",
        data: {
          logo: "https://example.com/logo.png",
          heading: "Chat with your data and get instant answers",
          description: "How can I increase my average order value?",
          media:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        },
        style: {
          backgroundImage:
            "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
        },
      },
      {
        id: "slide1",
        component: DefaultSlide,
        componentName: "DefaultSlide",
        data: {
          logo: "https://example.com/logo.png",
          heading: "Chat with your data and get instant answers",
          description: "How can I increase my average order value?",
          media:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
        },
        style: {
          backgroundImage:
            "https://imgs.search.brave.com/VyLhXiU9p4H6ba4k0Uqvf_eXM4Y8s_smuxvvQnzKYOM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTg5/MTIzNzgzMi92ZWN0/b3Ivc29mdC1ncmFp/bnktYmFja2dyb3Vu/ZC13aXRoLW1vdGlv/bi1ibHVyLWFuZC1n/bGl0Y2gtdGVjaG5p/cXVlLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1haXRQMnVI/MEVuQVdCal94dFdU/dW00VHFXeUgyaHk3/R0ljci03R19ZZ2tj/PQ",
        },
      },
    ],
    resources: {
      background,
      font,
      border,
      shadow,
    },
    tags: ["trending", "minimalist"],
  },
];
