import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ContactForm from '../../components/contact/ContactForm';
import ContactInfo from '../../components/contact/ContactInfo';
import Map from '../../components/contact/Map';
import FAQ from '../../components/contact/FAQ';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Liên hệ với chúng tôi
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn trong suốt hành trình học tiếng Anh.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
      <Map />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Contact;