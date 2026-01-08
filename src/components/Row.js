import Card from './Card';

export default function Row({ title, items, isLargeRow, onCardClick }) {
  return (
    <div className="row">
      <h2 className="row-title">{title}</h2>
      <div className="row-posters no-scrollbar">
        {items.map((item, index) => (
          <Card
            key={item.id}
            item={item}
            isLarge={isLargeRow}
            onClick={() => onCardClick(items, index)}
          />
        ))}
      </div>

      <style jsx>{`
        .row {
          margin-left: 0;
          color: white;
          margin-bottom: 2.5rem;
          /* Fade gently into next rows */
        }

        .row-title {
          margin-left: 4%;
          font-size: 1.4vw; /* Responsive font size like Netflix */
          font-weight: 500;
          margin-bottom: 0.8rem;
          color: #e5e5e5;
        }
        
        @media (min-width: 1400px) {
           .row-title { font-size: 1.5rem; }
        }

        .row-posters {
          display: flex;
          overflow-y: hidden;
          overflow-x: scroll;
          padding: 10px 4%; /* Horizontal padding aligns with content */
          scroll-behavior: smooth;
        }
        
        /* Ensure hover effects don't get cut off vertically */
        .row-posters {
          padding-top: 10px;
          padding-bottom: 40px;
          margin-bottom: -30px; /* Counteract padding-bottom */
        }
      `}</style>
    </div>
  );
}
