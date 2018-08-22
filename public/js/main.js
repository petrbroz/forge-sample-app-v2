let app = null;

function initializeViewer(urn) {
    const options = {
        env: 'AutodeskProduction',
        getAccessToken: (callback) => {
            fetch('/api/forge/oauth/token')
                .then((response) => response.json())
                .then((json) => {
                    console.log('Access token received', json);
                    callback(json.access_token, json.expires_in);
                });
        }
    };
    Autodesk.Viewing.Initializer(options, () => {
        app = new Autodesk.Viewing.ViewingApplication('viewer');
        app.registerViewer(app.k3D, Autodesk.Viewing.Private.GuiViewer3D, { extensions: ['AwesomeExtension'] });
        app.loadDocument('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadError);
    });
}

function onDocumentLoadSuccess(doc) {
    const viewables = app.bubble.search({ type: 'geometry' });
    if (viewables.length === 0) {
        console.error('No viewables in document', doc);
        return;
    }
    app.selectItem(viewables[0].data, onModelLoadSuccess, onModelLoadError);
}

function onDocumentLoadError(err) {
    console.error('Document loading error', err);
}

function onModelLoadSuccess(model) {
    console.info('Model loaded', model);
}

function onModelLoadError(err) {
    console.error('Model loading error', err);
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URL(document.location).searchParams;
    if (params.get('urn')) {
        initializeViewer(params.get('urn'));
    } else {
        document.getElementById('viewer').innerHTML = `
            <div class="warning">
                Please provide an ID of the viewed document in the URL as
                <code>${document.location}?urn=<em>your-document-id</em></code>.
            </div>
            <div class="warning">
                You can browse your Forge buckets and objects/documents
                via <code>${document.location}api/buckets</code>
                and <code>${document.location}api/buckets/<em>your-bucket-name</em></code>.
            </div>
        `;
    }
});