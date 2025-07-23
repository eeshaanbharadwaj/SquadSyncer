function Footer() {
  return (
    <footer>
      <div className=" bg-neutral-800 p-6 px-10">
        <div className=" text-white pb-4 flex justify-between px-4 flex-col
         sm:flex-row">
          <div className="flex flex-col items-center sm:items-start">
            <div className="font-bold">
              <h2>
                <span className="font-bold text-2xl ">SquadSyncer</span>
              </h2>
            </div>
            <div className=" font-extralight sm:w-1/2 text-sm max-sm:py-4">
              Connecting Teams, Uniting Dreams, Find Your Perfect Team with
              SquadSyncer!
            </div>
          </div>
          { <div>
            <div className=" text-sm text-center">
              <div className="py-2 border-b-[1px]">
                <h1 className="py-2">Connect with us</h1>
                <a
                  href="https://www.linkedin.com/in/anishuddaw/"
                  className=" cursor-pointer px-2"
                >
                  <span>
                    <ion-icon name="logo-linkedin"></ion-icon>
                  </span>
                </a>
                <a
                  href="https://github.com/anni-loper"
                  className=" cursor-pointer px-2"
                >
                  <span>
                    <ion-icon name="logo-github"></ion-icon>
                  </span>
                </a>
              </div>
              <h1 className=" py-2 text-xs">uddawanish@gmail.com</h1>
            </div>
          </div> }
        </div>
        <div className=" text-white font-thin text-sm flex justify-between border-t-[1px] pt-6 ">
          <div className="flex">© SquadSyncer. All rights reserved.</div>
          <div className="flex">2024</div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
