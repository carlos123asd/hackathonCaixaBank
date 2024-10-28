import React, { useCallback } from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';

const ExportButton = React.memo(function ExportButton({ data, filename, headers, label }) {
    const handleExport = useCallback(() => {
        const csvContent = convertArrayOfObjectsToCSV(data, headers);

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

        saveAs(blob, filename);
    }, [data, filename, headers]);

    const convertArrayOfObjectsToCSV = (data, headers) => {
        const csvRows = [];
        csvRows.push(headers.join(','));

        data.forEach((item) => {
            const values = headers.map((header) => {
                const escaped = ('' + item[header]).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        });

        return csvRows.join('\n');
    };

    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            disabled={!data || data.length === 0}
        >
            {label || 'Export CSV'}
        </Button>
    );
});

ExportButton.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    filename: PropTypes.string,
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string,
};

ExportButton.defaultProps = {
    filename: 'data.csv',
    label: 'Export CSV',
};

export default ExportButton;
