// components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{
      padding: '1rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid #ccc',
      marginTop: '2rem'
    }}>
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
}
