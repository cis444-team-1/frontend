import styles from "./styles/page.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
        <p className={styles.text}>
          We collect information you provide directly to us, such as when you
          create an account, make a purchase, or contact our support team. This
          may include:
        </p>
        <ul className={styles.list}>
          <li>Personal identification information</li>
          <li>Contact details</li>
          <li>Payment information</li>
          <li>Usage data and preferences</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
        <p className={styles.text}>We use the collected information to:</p>
        <ul className={styles.list}>
          <li>Provide and maintain our service</li>
          <li>Notify you about changes to our service</li>
          <li>Allow you to participate in interactive features</li>
          <li>Provide customer support</li>
          <li>
            Gather analysis or valuable information to improve our service
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Data Protection</h2>
        <p className={styles.text}>
          We implement a variety of security measures to maintain the safety of
          your personal information. Your personal information is contained
          behind secured networks and is only accessible by a limited number of
          persons who have special access rights.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Cookies and Tracking</h2>
        <p className={styles.text}>
          We use cookies and similar tracking technologies to enhance your
          experience, analyze website traffic, and understand where our visitors
          are coming from.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>5. Third-Party Disclosure</h2>
        <p className={styles.text}>
          We do not sell, trade, or otherwise transfer your personally
          identifiable information to outside parties without providing you
          clear notice and opportunity to opt-out.
        </p>
      </section>

      <div className={styles.lastUpdated}>Last Updated: March 26, 2025</div>
    </div>
  );
}
