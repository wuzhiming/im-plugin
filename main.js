'use strict';
const Electron = require('electron');
const ipcMain = Electron.ipcMain;
class ImPlugin {
    constructor() {
        this.messages = {};
    }

    load() {
        this._registerEvent()
    }

    unload() {
        this._unregisterEvent();
    }

    _registerEvent() {
        ipcMain.on('editor:ready', this.queryImInfo);
    }

    async queryImInfo() {
        console.log('query-im-info-----');
        //获取im接口
        // let info = await Editor.User.queryIMInfo();
        let html = `<div
                    class="im-icon-area"
                    onclick="(function (){
                        Editor.Panel.open('im-plugin',{openUrl:'https://www.baidu.com'});
                    })();"
                    >
                <img src="http://lcywzm.cn/static/video/res/raw-assets/fb/fb5529c0-5faa-4151-911b-bc43689daff2.png"
                     alt="aaa"
                     title="aaa"/>
                <img class="red-point"
                     src="static/img/im-point.png"/>
            </div>
            `;
        Editor.Ipc.sendToAll('im-plugin:update-im-html', html);
    }

    _unregisterEvent() {
        ipcMain.off('editor:ready', this.queryImInfo);
    }
}

module.exports = new ImPlugin();