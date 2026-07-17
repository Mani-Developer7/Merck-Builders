const MapEmbed = ({
  query = 'Marjan Classic Mall %26 Residency Sector 16-A Shah Latif Town Karachi',
  height = 420,
}) => (
  <div className="rounded-2xl overflow-hidden border border-brass/20" style={{ height }}>
    <iframe
      title="Project location map"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://www.google.com/maps?q=${query}&output=embed`}
    />
  </div>
);

export default MapEmbed;
