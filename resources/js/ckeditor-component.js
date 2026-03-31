async function createCKEditor({ ClassicEditor, licenseKey, instanceKey, editorId, placeholder, uploadUrl, isDisabled }) {
    // To prevent duplicates, halt here if an editor already exists
    const instance = window.ckeditorInstances[instanceKey];
    if (instance?.editor)
        return;

    // Check if the textarea element exists
    const textarea = document.querySelector('#' + instanceKey);
    if (!textarea) {
        console.warn('CKEditor textarea not found for: ' + instanceKey);
        return;
    }

    const {
        AccessibilityHelp, Alignment, Autoformat, AutoImage, AutoLink, Autosave,
        BlockQuote, Bold, Code, CodeBlock, Essentials, FindAndReplace,
        FontBackgroundColor, FontColor, FontFamily, FontSize, GeneralHtmlSupport,
        Heading, Highlight, HorizontalLine, HtmlComment, HtmlEmbed,
        ImageBlock, ImageCaption, ImageInline, ImageInsert, ImageInsertViaUrl,
        ImageResize, ImageStyle, ImageTextAlternative, ImageToolbar, ImageUpload,
        Indent, IndentBlock, Italic, Link, LinkImage, List, ListProperties,
        MediaEmbed, PageBreak, Paragraph, PasteFromOffice, RemoveFormat,
        SelectAll, ShowBlocks, SourceEditing, SpecialCharacters,
        SpecialCharactersArrows, SpecialCharactersCurrency, SpecialCharactersEssentials,
        SpecialCharactersLatin, SpecialCharactersMathematical, SpecialCharactersText,
        Strikethrough, Style, Subscript, Superscript, Table, TableCaption,
        TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
        TextTransformation, TodoList, Underline, Undo, SimpleUploadAdapter
    } = ClassicEditor;

    const plugins = [
        ImageInsertViaUrl
    ];
    const uploadIcons = [];
    const createOptions = {};
    if (uploadUrl) {
        plugins.push(...[
            ImageInsert,
            ImageUpload,
            SimpleUploadAdapter
        ]);

        uploadIcons.push(...[
            'insertImage',
        ]);

        const csrfToken = document.querySelector('meta[name=csrf-token]').getAttribute('content');

        createOptions['simpleUpload'] = {
            uploadUrl: uploadUrl,
            withCredentials: true,
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        };
    }

    try {
        // Create new editor instance
        const editor = await ClassicEditor
            .create(textarea, {
                licenseKey,
                plugins: [
                    AccessibilityHelp,
                    Alignment,
                    Autoformat,
                    AutoImage,
                    AutoLink,
                    Autosave,
                    BlockQuote,
                    Bold,
                    Code,
                    CodeBlock,
                    Essentials,
                    FindAndReplace,
                    FontBackgroundColor,
                    FontColor,
                    FontFamily,
                    FontSize,
                    GeneralHtmlSupport,
                    Heading,
                    Highlight,
                    HorizontalLine,
                    HtmlComment,
                    HtmlEmbed,
                    ImageBlock,
                    ImageCaption,
                    ImageInline,
                    ImageResize,
                    ImageStyle,
                    ImageTextAlternative,
                    ImageToolbar,
                    Indent,
                    IndentBlock,
                    Italic,
                    Link,
                    LinkImage,
                    List,
                    ListProperties,
                    MediaEmbed,
                    PageBreak,
                    Paragraph,
                    PasteFromOffice,
                    RemoveFormat,
                    SelectAll,
                    ShowBlocks,
                    SourceEditing,
                    SpecialCharacters,
                    SpecialCharactersArrows,
                    SpecialCharactersCurrency,
                    SpecialCharactersEssentials,
                    SpecialCharactersLatin,
                    SpecialCharactersMathematical,
                    SpecialCharactersText,
                    Strikethrough,
                    Style,
                    Subscript,
                    Superscript,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    TextTransformation,
                    TodoList,
                    Underline,
                    Undo,
                    ...plugins
                ],
                toolbar: {
                    items: [
                        'undo',
                        'redo',
                        '|',
                        'sourceEditing',
                        'showBlocks',
                        '|',
                        'heading',
                        'style',
                        '|',
                        'fontSize',
                        'fontFamily',
                        'fontColor',
                        'fontBackgroundColor',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'link',
                        ...uploadIcons,
                        'insertTable',
                        'highlight',
                        'blockQuote',
                        'codeBlock',
                        '|',
                        'alignment',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'todoList',
                        'outdent',
                        'indent'
                    ],
                    shouldNotGroupWhenFull: false
                },
                fontFamily: {
                    supportAllValues: true
                },
                fontSize: {
                    options: [10, 12, 14, 'default', 18, 20, 22],
                    supportAllValues: true
                },
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        },
                        {
                            model: 'heading4',
                            view: 'h4',
                            title: 'Heading 4',
                            class: 'ck-heading_heading4'
                        },
                        {
                            model: 'heading5',
                            view: 'h5',
                            title: 'Heading 5',
                            class: 'ck-heading_heading5'
                        },
                        {
                            model: 'heading6',
                            view: 'h6',
                            title: 'Heading 6',
                            class: 'ck-heading_heading6'
                        }
                    ]
                },
                htmlSupport: {
                    allow: [
                        {
                            name: /^.*$/,
                            styles: true,
                            attributes: true,
                            classes: true
                        }
                    ],
                    disallow: [
                        {
                            styles: {
                                'background-color': true,
                                'color': true
                            }
                        }
                    ]
                },
                image: {
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        '|',
                        'imageStyle:inline',
                        'imageStyle:wrapText',
                        'imageStyle:breakText',
                        '|',
                        'resizeImage'
                    ]
                },
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual',
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                list: {
                    properties: {
                        styles: true,
                        startIndex: true,
                        reversed: true
                    }
                },
                menuBar: {
                    isVisible: true
                },
                placeholder: placeholder,
                style: {
                    definitions: [
                        {
                            name: 'Article category',
                            element: 'h3',
                            classes: ['category']
                        },
                        {
                            name: 'Title',
                            element: 'h2',
                            classes: ['document-title']
                        },
                        {
                            name: 'Subtitle',
                            element: 'h3',
                            classes: ['document-subtitle']
                        },
                        {
                            name: 'Info box',
                            element: 'p',
                            classes: ['info-box']
                        },
                        {
                            name: 'Side quote',
                            element: 'blockquote',
                            classes: ['side-quote']
                        },
                        {
                            name: 'Marker',
                            element: 'span',
                            classes: ['marker']
                        },
                        {
                            name: 'Spoiler',
                            element: 'span',
                            classes: ['spoiler']
                        },
                        {
                            name: 'Code (dark)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-dark']
                        },
                        {
                            name: 'Code (bright)',
                            element: 'pre',
                            classes: ['fancy-code', 'fancy-code-bright']
                        }
                    ]
                },
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableProperties',
                        'tableCellProperties'
                    ]
                },
                ...createOptions
            });

        instance.editor = editor;

        // Find the main ckeditor class and add some helpful class names to it
        const editorMain = document.querySelector('#' + instanceKey + ' + .ck-editor .ck-editor__main');
        if (editorMain) {
            editorMain.classList.add('prose', 'max-w-none', 'dark:prose-invert');
        }

        const sync = syncCKEditorWrap(instanceKey, editor);

        // Listen to changes (only if not disabled)
        if (!isDisabled) {
            // Update Alpine state immediately on every change (no network calls)
            editor.model.document.on('change:data', sync);

            // Flush on Ctrl+S BEFORE Filament triggers save
            instance.onKeyDown = (e) => {
                const isSave = (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S');
                if (!isSave)
                    return;

                sync();
            };

            window.addEventListener('keydown', instance.onKeyDown, true);
        } else {
            editor.enableReadOnlyMode(editorId);
        }
    } catch (err) {
        console.error('Error creating CKEditor:', err);
        // Clear instance on error to allow retry
        if (instance) {
            instance.editor = null;
        }
    }
}

function syncCKEditorWrap(instanceKey) {
    return function syncCKEditor() {
        const instance = window.ckeditorInstances[instanceKey];
        const editor = instance?.editor;
        if (!editor || !instance?.alpineComponent)
            return;

        instance.__fromEditor = true;
        instance.alpineComponent.state = instance.editor.getData();
        instance.__fromEditor = false;
    };
}

async function destroyCKEditor(instanceKey) {
    const instance = window.ckeditorInstances[instanceKey];
    const editor = instance?.editor;
    if (!editor)
        return;

    if (editor.onKeyDown) {
        window.removeEventListener('keydown', editor.onKeyDown, true);
        editor.onKeyDown = null;
    }

    try {
        await editor.destroy();

        // Clear the instance reference after destruction
        instance.editor = null;
        instance.alpineComponent = null;
        instance.__fromEditor = false;
    } catch (err) {
        console.error('Error destroying CKEditor:', err);
        // Clear reference even on error to allow re-initialization
        instance.editor = null;
    }
}

function waitFor(fnName) {
    return new Promise(resolve => {
        const t = setInterval(() => {
            if (typeof window[fnName] === 'function') {
                clearInterval(t);
                resolve(window[fnName]);
            }
        }, 25);
    });
}

document.addEventListener('alpine:init', () => {
    Alpine.data('ckeditor', ({ licenseKey = 'GPL', state, editorId, uploadUrl, placeholder, isDisabled }) => ({
        state: state,
        instanceKey: `ckeditor-${editorId}`,

        async init() {
            const ClassicEditor = await waitFor('ClassicEditor');

            try {
                window.ckeditorInstances = window.ckeditorInstances || {};
                const instance = window.ckeditorInstances[this.instanceKey] = window.ckeditorInstances[this.instanceKey] || {
                    alpineComponent: this,
                    editor: null,
                    __fromEditor: false,
                    onKeyDown: null,
                    createHandler: null,
                    destroyHandler: null
                };

                // Remove existing event listeners to prevent duplicates
                if (instance?.createHandler) {
                    document.removeEventListener('livewire:navigated', instance.createHandler);
                }
                if (instance?.destroyHandler) {
                    document.removeEventListener('livewire:navigate', instance.destroyHandler);
                }

                // Create handler with Alpine component context
                instance.createHandler = async () => {
                    createCKEditor({
                        ClassicEditor,
                        licenseKey,
                        instanceKey: this.instanceKey,
                        editorId,
                        placeholder,
                        uploadUrl,
                        isDisabled
                    });
                };
                instance.destroyHandler = async () => {
                    destroyCKEditor(this.instanceKey);
                };

                // Add event listeners if not already added
                document.addEventListener('livewire:navigated', instance.createHandler);
                document.addEventListener('livewire:navigate', instance.destroyHandler);

                // Initialize editor immediately if ClassicEditor is available
                await this.$nextTick();
                if (!instance.editor) {
                    await instance.createHandler();
                }

                // Watch for state changes and update editor content
                this.$watch('state', value => this.handleStateChange(value));
            } catch (error) {
                console.error('Error init CKEditor:', error);
            }
        },

        handleStateChange(value) {
            const instance = window.ckeditorInstances[this.instanceKey];
            const editor = instance?.editor;
            if (editor && !instance.__fromEditor && value !== editor.getData()) {
                editor.setData(value ?? '');
            }
        },

        destroy() {
            const instance = window.ckeditorInstances[this.instanceKey];
            const release = instance?.destroyHandler;

            // Remove event listeners
            document.removeEventListener('livewire:navigated', instance?.createHandler);
            document.removeEventListener('livewire:navigate', instance?.destroyHandler);

            release && release();
        }
    }));
});
