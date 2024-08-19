import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'), {
  ssr: false,
});
const lightfair = require('react-syntax-highlighter/dist/cjs/styles/hljs/lightfair').default;

const CodeBlock = () => {
  const codeString = `<html>
        <head>
            <link rel="stylesheet" type="text/css" href="https://www.femlo.cfd/path/to/your-styles.css">
        </head>
        <body>
            <div id="femlo-widget"></div>
            <script src="https://www.femlo.cfd/public/widget/embedWidget.js" async></script>  
        </body>
</html>`;
  return (
    <SyntaxHighlighter language="javascript" customStyle={{
     height: "240px",
     width: "600px"
    }} style={lightfair}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;