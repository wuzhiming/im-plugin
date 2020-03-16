const fs = require('fire-fs');
const path = require('fire-path');
Editor.Panel.extend({
    listeners: {},

    style: fs.readFileSync(Editor.url('packages://im-plugin/panel/index.css')),
    template: fs.readFileSync(Editor.url('packages://im-plugin/panel/index.html'), 'utf-8'),
    messages: {},

    run (args) {
        this.recordPath = null;
        if (args && args.openUrl) {
            this.openUrl = args.openUrl;
        }
    },

    ready () {
        //todo:因为有时候需要传入参数，但是run又在ready后面执行,而且如果没有参数就不执行run回调，所以只能做这个兼容
        process.nextTick(() => {
            let openUrl = this.openUrl || 'https://www.cocos.com';
            this.vm = new Vue({
                el: this.shadowRoot,
                data: function () {
                    return {
                        url: openUrl,
                    }
                }

            });
            this.vm.width = this.clientWidth;
        });
    },

});