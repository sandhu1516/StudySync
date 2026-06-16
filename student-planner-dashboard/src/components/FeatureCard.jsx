import { useNavigate } from "react-router-dom";

function FeatureCard({
  icon,
  title,
  description,
  route
}) {

  const navigate = useNavigate();

  return (

    <div
      className="feature-card"
      onClick={() => navigate(route)}
    >

      <div className="feature-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

    </div>
  );
}

export default FeatureCard;