// function splitIntoLines(text:string, containerWidth:number, font:string) {
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");
//   if(! ctx ) return ;
//   ctx.font = font;

//   const words = text.split(" ");
//   const lines = [];
//   let line = "";

//   for (const word of words) {
//     const testLine = line ? line + " " + word : word;
//     const testWidth = ctx.measureText(testLine).width;
//     if (testWidth > containerWidth) {
//       lines.push(line);
//       line = word;
//     } else {
//       line = testLine;
//     }
//   }

//   if (line) lines.push(line);
//   return lines;
// }
// export default splitIntoLines ;