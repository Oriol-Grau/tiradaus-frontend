import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--mui-palette-background-footer)",
        color: "var(--mui-palette-secondary-main)",
        padding: "0.5rem",
        textAlign: "center",
      }}
    >
      <p className={styles.line}>
        <span style={{ verticalAlign: "top" }}>Segueix-nos a: </span>
        <FacebookIcon />
        <TwitterIcon />
        <InstagramIcon />
        <YouTubeIcon />
        <span style={{ verticalAlign: "top", marginLeft: "1.5rem" }}>
          &copy; 2025 Tiradaus. Tots els drets reservats.
        </span>
      </p>
    </footer>
  );
};
