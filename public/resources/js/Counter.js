/**
 * Character Counter plugin for Ext HtmlEditor
 *
 * Example of usage:
 *
 * var myplugin = new Ext.ux.form.HtmlEditorCounterPlugin ({prefix: 'Current size is '});
 *
 */

if (Ext.ux.form == undefined) {
    Ext.ns('Ext.ux.form');
}

Ext.ux.form.HtmlEditorCounterPlugin = function (config) {
    Ext.apply(this, config);
};

Ext.extend (Ext.ux.form.HtmlEditorCounterPlugin, Ext.util.Observable, {
    prefix: '',
    itemTypeSingular: ' character',
    itemTypePlural: ' characters',
    itemTypeNone: ' characters',
    onRender: function (o) {
        this.counter = document.createElement("DIV");
        this.editor.getToolbar ().add (this.counter);
        this.set_counter ((this.editor.initialConfig.value || '').length);
    },
    init:   function (editor) {
        this.editor = editor;
        this.editor.on ('render', this.onRender, this);
        this.editor.on ('sync', function (ct, html) { this.set_counter (html.length); }, this);
    },
    set_counter: function (s) {
        this.counter.innerHTML = this.prefix + s + ((s) ? ((s > 1) ? this.itemTypePlural: this.itemTypeSingular) : this.itemTypeNone);
    }
});