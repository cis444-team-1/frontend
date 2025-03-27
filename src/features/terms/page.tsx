import styles from "./styles/page.module.css";

export default function TermsAndConditionsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Terms and Conditions</h1>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
        <p className={styles.text}>
          By accessing and using this website, you accept and agree to be bound
          by the terms and provision of this agreement.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>2. Use of Service</h2>
        <p className={styles.text}>
          You agree to use the service only for lawful purposes and in a way
          that does not infringe the rights of, restrict or inhibit anyone
          else's use and enjoyment of the website.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>3. Intellectual Property</h2>
        <p className={styles.text}>
          All content included on this site is and shall continue to be the
          property of our company or its content suppliers and is protected
          under applicable copyright, trademark, and other intellectual property
          laws.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>4. Limitation of Liability</h2>
        <p className={styles.text}>
          Our company shall not be liable for any indirect, incidental, special,
          consequential or punitive damages, including without limitation, loss
          of profits, data, use, goodwill, or other intangible losses.
        </p>
      </section>
    </div>
  );
}
