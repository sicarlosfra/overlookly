export default function ColophonPage() {
  return (
    <div>
      <h1 className="text-h1 mb-3.5">Colophon</h1>
      <p className="text-body mb-3.5">
        Notes on how this site and the tool itself are built.
      </p>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Site</h2>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">Next.js, deployed on Vercel</li>
        <li className="mb-1.5">Inter, via next/font/google</li>
        <li className="mb-1.5">Tailwind CSS for styling</li>
      </ul>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Tool</h2>
      <ul className="pl-5 text-body list-disc">
        <li className="mb-1.5">overlookly-a11y — vanilla JavaScript, no framework dependency</li>
        <li className="mb-1.5">overlookly-mcp — Node.js, built on the Model Context Protocol SDK</li>
      </ul>

      <h2 className="text-h2 mt-10 mb-3 border-t border-[#eee] pt-6">Built with</h2>
      <p className="text-body mb-3.5">
        Designed and built by <a href="https://www.sicarlos.co/" target="_blank" rel="noopener noreferrer">Carlos</a>,
        with Claude.
      </p>
    </div>
  );
}
