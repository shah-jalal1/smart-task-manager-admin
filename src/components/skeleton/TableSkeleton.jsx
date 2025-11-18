import './TableSkeleton.css';  // Assuming the CSS is saved as TableSkeleton.css

const TableSkeleton = () => {
    return (
        <div className="skeleton-loader">
            {Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="skeleton-row">
                    {/* Skeleton Cells - Adjust width as needed for your table columns */}
                    <div className="skeleton-cell" style={{ width: '20%' }}></div>
                    <div className="skeleton-cell" style={{ width: '25%' }}></div>
                    <div className="skeleton-cell" style={{ width: '30%' }}></div>
                    <div className="skeleton-cell" style={{ width: '15%' }}></div>
                    <div className="skeleton-cell" style={{ width: '10%' }}></div>
                </div>
            ))}
        </div>
    );
};

export default TableSkeleton;
