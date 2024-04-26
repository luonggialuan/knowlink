/* eslint-disable react/no-unescaped-entities */
import React from 'react'

type Props = {}

const Policy = (props: Props) => {
  return (
    <>
      <div className={`w-[95%] 800px:w-[85%] m-auto mt-2`}>
        <h1 className="text-center font-Roboto text-[40px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-gray-300 800px:!leading-[60px] text-[#000] font-[500] tracking-tight">
          Privacy Policy
        </h1>
        <br />
        <div className="w-[95%] 800px:w-[85%] m-auto text-justify dark:text-gray-300">
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to KnowLink! At KnowLink, we value your privacy and are
            committed to protecting your personal information. This Privacy
            Policy outlines how we collect, use, and safeguard your data when
            you use our e-learning platform. By accessing or using KnowLink, you
            agree to the terms outlined in this policy.
          </p>

          <h2 className="text-xl font-bold mt-8 mb-4">
            Information We Collect
          </h2>
          <ul className="list-inside list-decimal text-gray-700 mb-8 dark:text-gray-300">
            <li>
              Personal Information: When you register or use our platform, we
              may collect personal details such as your name, email address,
              contact information, and payment details.
            </li>
            <li>
              Usage Data: We gather information about your interactions with
              KnowLink, such as your device information, browsing history, and
              preferences.
            </li>
            <li>
              Cookies and Tracking Technologies: We use cookies and similar
              technologies to enhance your experience, analyze trends, and track
              your activity on our platform.
            </li>
          </ul>

          <h2 className="text-xl font-bold mb-4">Your Rights and Choices</h2>
          <p className="text-gray-700 mb-8 dark:text-gray-300">
            You have the right to access, update, correct, or delete your
            personal information. You may also choose to opt-out of certain
            communications or data processing activities. If you have any
            questions or requests regarding your data, please contact us using
            the information provided below.
          </p>

          <h2 className="text-xl font-bold mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-8 dark:text-gray-300">
            We reserve the right to update or modify this Privacy Policy at any
            time. Any changes will be reflected on this page, and we encourage
            you to review it periodically. Your continued use of KnowLink after
            the posting of changes constitutes your acceptance of those changes.
          </p>

          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-8 dark:text-gray-300">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our data practices, please don't hesitate to
            contact us at [Insert Contact Information].
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            Thank you for entrusting us with your information. We are dedicated
            to maintaining your privacy and providing you with a secure and
            rewarding learning experience at KnowLink.
          </p>
        </div>
      </div>
    </>
  )
}

export default Policy
