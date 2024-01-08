import "./App.css";
import "../lib/styles/_mixins.scss";

import Editor from "../lib/components/Editor";
import { Editor as coreEditor, Range } from "@tiptap/core";
import { Icons } from "../lib/components/Icons";
import { GoogleGenerativeAI } from "@google/generative-ai";

function getPrevText(
  editor: coreEditor,
  {
    chars,
    offset = 0,
  }: {
    chars: number;
    offset?: number;
  }
) {
  return editor.state.doc.textBetween(
    Math.max(0, editor.state.selection.from - chars),
    editor.state.selection.from - offset,
    "\n"
  );
}

function App() {
  const genAI = new GoogleGenerativeAI(
    import.meta.env.VITE_PALM_API_KEY_PUBLIC
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const palmApi = {
    title: "Continue writing",
    description: "Use AI to expand your thoughts.",
    searchTerms: ["ai", "artificial intelligence", "expand", "continue"],
    icon: Icons.palm,
    command: ({ editor }: { editor: coreEditor; range: Range }) => {
      const prompt =
        "You are an AI writing assistant that continues existing text based on context from prior text. " +
        "Give more weight/priority to the later characters than the beginning ones. " +
        "Limit your response to no more than 200 characters, but make sure to construct complete sentences." +
        "The following is the text that you should continue:\n" +
        getPrevText(editor, { chars: 500 });
      model
        .generateContent(prompt)
        .then((res) => res)
        .then((res) => res.response)
        .then((res) => {
          editor.chain().focus().insertContent(res.text()).run();
        });
    },
  };

  const temp = `
<h2>Introducing UnNovel</h2>
UnNovel is a half-baked, Notion style WYSIWYG editor that is built on top of TipTap(Another way of saying "I just copy-pasted the code from TipTap examples"). 
<br />
<h3>Features</h3>
<ul>
  <li>Slash commands</li>
  <li>AI writing assistant</li>
  <li>No garbage</li>
</ul>

<br />
<h1>It also has AI! Wow! So cool! Yayy!</h1>
<br />

If you still don't get it, Its a parody of Novel, editor that is built on top of TipTap. 
Props to the creator of Novel, but he just copy-pasted the code from TipTap examples and a CodeSandBox(I'll add it in the readme). 
The main selling point, the AI auto complete, guess what, is also copied from Vercel docs. On top of that, it has some telemetry 
that sends data to his server whenever someone uses the slash command.                                                                                                                                                                                                                                                

<br />
<br />
He advertised it soo much that it got to the top of Google search results. Twitter, Reddit, HackerNews, everywhere.
<br />
<br />
When I actually tried it, I was disappointed. The library was not very extensible, and the code was a mess. And when people opened issues,
<br />
<blockquote>
Oh good question, haven't dealt with multiple images before – PRs welcome! 👀
</blockquote>
<br />
<em>Sigh</em> I didn't want to deal with that. So I decided to make my own version of it. I'm not a good writer, so I'll just end it here.
<br />
<br />
<h2>Oh right, I added a AI assistant too. Just to show how lame and easy it is to add one. Go on and try.</h2>
`;

  return (
    <>
      <header>
        <h1>UnNovel</h1>
        <a
          href="https://github.com/ABSanthosh/unnovel"
          target="_blank"
          rel="noopener noreferrer"
        >
          {Icons.github} ABSanthosh/unnovel
        </a>
      </header>
      <Editor items={[palmApi]} initialContent={temp} />
    </>
  );
}

export default App;
