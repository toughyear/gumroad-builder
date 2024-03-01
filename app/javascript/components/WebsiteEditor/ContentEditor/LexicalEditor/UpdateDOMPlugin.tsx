import React from "react";
import { RichTextSection } from "../../../../types/website";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"; // Note the import change to include $parseHtmlString
import { $getRoot, $insertNodes } from "lexical";

interface UpdateDOMPluginProps {
  setSection: React.Dispatch<React.SetStateAction<RichTextSection>>;
  initialDOMString?: string;
}

function UpdateDOMPlugin(props: UpdateDOMPluginProps) {
  const { setSection, initialDOMString } = props;
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);

          setSection((section) => ({
            ...section,
            data: {
              ...section.data,
              dom: htmlString,
            },
          }));
        });
      }
    );

    // Check if initialDOMString is provided and valid and is different from the current DOM
    if (initialDOMString) {
      editor.update(() => {
        const currentDOM = $generateHtmlFromNodes(editor, null);
        if (currentDOM === initialDOMString) {
          return;
        }

        const parser = new DOMParser();
        const parsedDOM = parser.parseFromString(initialDOMString, "text/html");
        const nodes = $generateNodesFromDOM(editor, parsedDOM);

        // Select the root
        $getRoot().select();
        $getRoot().clear();
        // Insert them at a selection.
        $insertNodes(nodes);
      });
    }

    return () => {
      removeUpdateListener();
    };
  }, [editor, initialDOMString]); // Add initialDOMString to the dependency array

  return null;
}

export default UpdateDOMPlugin;
