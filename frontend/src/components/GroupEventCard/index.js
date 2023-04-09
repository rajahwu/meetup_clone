const GroupEventCard = ({ name, description, city, state, type, children }) => (
    <div style={{ display: "flex" }}>
      {children}
      <div>
        <h2>{name}</h2>
        <p>
          {city}, {state}
        </p>
        <p>{description}</p>
        <div style={{ display: "flex" }}>
          <p>## events</p>
          <p>&#183;</p>
          <p>public or privite, {type}</p>
        </div>
      </div>
    </div>
  );

  export default GroupEventCard