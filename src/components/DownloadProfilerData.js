import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import { profilerData } from '../utils/profilerData';

function DownloadProfilerData() {
    const handleDownload = () => {
        if (!profilerData || Object.keys(profilerData).length === 0) {
            alert('No profiler data available to download.');
            return;
        }

        const jsonString = JSON.stringify(profilerData, null, 2);

        const blob = new Blob([jsonString], { type: 'application/json' });

        saveAs(blob, 'profilerData.json');
    };

    return (
        <Button
            variant="contained"
            color="secondary"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
        >
            Download Profiler Data
        </Button>
    );
}

export default DownloadProfilerData;
