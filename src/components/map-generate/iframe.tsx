import { NextPage } from 'next';
import Head from 'next/head';

const ShareMapPage: NextPage = () => {
  // Replace these variables with your actual map coordinates
  const latitude = 48.8566;
  const longitude = 2.3522;
  const zoom = 14;

  // Generate the iframe code snippet
  const iframeCode = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.286504980551!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e1f06e2b70f%3A0x40b82c3688c9460!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1631947602489!5m2!1sen!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

  return (
    <div>
      <Head>
        <title>Share Map</title>
      </Head>
      <div className="max-w-screen-lg mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Share Map</h1>
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="mb-4">Copy and paste the following code snippet to share the map:</p>
          <textarea
            className="w-full h-32 p-2 bg-gray-200 rounded-md resize-none"
            value={iframeCode}
            readOnly
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default ShareMapPage;
