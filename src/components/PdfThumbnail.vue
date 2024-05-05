<template>
  <img v-if="pdfThumbnail" :src="pdfThumbnail" alt="PDF Thumbnail" />
</template>

<script>
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

export default {
  name: "PdfThumbnail",
  props: ["pdf"],
  data() {
    return {
      pdfThumbnail: null,
    };
  },
  mounted() {
    this.renderThumbnails();
  },
  methods: {
    renderThumbnails() {
      const file = this.pdf;
      const reader = new FileReader();

      reader.onload = (e) => {
        const pdfData = new Uint8Array(e.target.result);
        this.loadPdf(pdfData);
      };

      reader.readAsArrayBuffer(file);
    },
    async loadPdf(pdfData) {
      const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
      const page = await pdf.getPage(1);

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      const viewport = page.getViewport({ scale: 1 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: context, viewport }).promise;
      this.pdfThumbnail = canvas.toDataURL();
    },
  },
};
</script>
