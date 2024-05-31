import React, { FC } from 'react';

import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

export type PDFViewerProps = {
    pdfUrl: string;
};

const PDFViewer: FC<PDFViewerProps> = (props) => {
    const { pdfUrl } = props;

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <div
                style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '750px',
                    marginTop: '75px',
                }}
            >
                <Viewer defaultScale={1} fileUrl={pdfUrl} />
            </div>
        </Worker>
    );
};

export default PDFViewer;
