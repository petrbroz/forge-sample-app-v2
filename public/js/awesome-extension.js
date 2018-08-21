class AwesomeExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._toolbar = null;
    }

    load() {
        if (this.viewer.toolbar) {
            this._createUI();
        } else {
            this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, () => { this._createUI(); });
        }
        return true;
    }

    unload() {
        this.viewer.toolbar.removeControl(this._toolbar);
        this._toolbar = null;
        return true;
    }

    _createUI() {
        let button = new Autodesk.Viewing.UI.Button('AwesomeExtensionButton');
        button.onClick = (ev) => {
            alert('I am an awesome extension!');
        };
        button.addClass('awesome-extension-button');
        button.setToolTip('Awesome Extension');

        this._toolbar = new Autodesk.Viewing.UI.ControlGroup('AwesomeExtensionToolbar');
        this._toolbar.addControl(button);
        this.viewer.toolbar.addControl(this._toolbar);
    }
}

Autodesk.Viewing.theExtensionManager.registerExtension('AwesomeExtension', AwesomeExtension);