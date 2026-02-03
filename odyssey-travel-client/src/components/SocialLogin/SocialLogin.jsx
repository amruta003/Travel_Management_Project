import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

function SocialLogin() {
  return (
    <div className="text-center text-gray-500 text-sm mt-4">
      <div className="mb-3">— or sign in with —</div>
      <div className="flex justify-center gap-6 text-2xl">
        <FontAwesomeIcon
          icon={faGithub}
          className="cursor-pointer hover:text-black"
        />
        <FontAwesomeIcon
          icon={faGoogle}
          className="cursor-pointer hover:text-red-600"
        />
      </div>
    </div>
  )
}

export default SocialLogin