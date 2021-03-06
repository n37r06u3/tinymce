/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 */

import Tools from 'tinymce/core/api/util/Tools';

const hasImageClass = function (node) {
  const className = node.attr('class');
  return className && /\bimage\b/.test(className);
};

const toggleContentEditableState = function (state) {
  return function (nodes) {
    let i = nodes.length, node;

    const toggleContentEditable = function (node) {
      node.attr('contenteditable', state ? 'true' : null);
    };

    while (i--) {
      node = nodes[i];

      if (hasImageClass(node)) {
        node.attr('contenteditable', state ? 'false' : null);
        Tools.each(node.getAll('figcaption'), toggleContentEditable);
      }
    }
  };
};

const setup = function (editor) {
  editor.on('PreInit', function () {
    editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
    editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
  });
};

export default {
  setup
};