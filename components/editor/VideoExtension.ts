import {
  Node,
  mergeAttributes,
} from "@tiptap/core";

const VideoExtension = Node.create({
  name: "video",

  group: "block",

  atom: true,

  draggable: true,

  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },

      poster: {
        default: null,
      },

      controls: {
        default: true,
      },

      autoplay: {
        default: false,
      },

      loop: {
        default: false,
      },

      muted: {
        default: false,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "video",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      mergeAttributes(HTMLAttributes, {
        controls: true,
        playsinline: true,
        preload: "metadata",
      }),
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const wrapper =
        document.createElement("div");

      wrapper.className =
        "tiptap-video-wrapper";

      const video =
        document.createElement("video");

      video.src =
        node.attrs.src;

      video.controls = true;

      video.playsInline = true;

      video.preload = "metadata";

      if (node.attrs.poster) {
        video.poster =
          node.attrs.poster;
      }

      if (node.attrs.autoplay) {
        video.autoplay = true;
      }

      if (node.attrs.loop) {
        video.loop = true;
      }

      if (node.attrs.muted) {
        video.muted = true;
      }

      video.className =
        "tiptap-video";

      wrapper.appendChild(video);

      return {
        dom: wrapper,
      };
    };
  },
});

export default VideoExtension;