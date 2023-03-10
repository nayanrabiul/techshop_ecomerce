
  {status === "loading" ? (
    "Loading"
  ) : session?.user ? (
    
  ) : (
    <button className="hover:bg-green-100  p-1 px-2 rounded-md">
      <Link href={"/login"}>Login</Link>
    </button>
  )}





<Menu
      as="div"
      className="relative inline-block text-left px-2 "
    >
      <div>
        <Menu.Button className="inline-flex w-full justify-center items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <Image
            src="/profile.svg"
            alt="alt value"
            width={20}
            height={20}
            className=""
          ></Image>
          {session.user.name}
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
               
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                
              )}
            </Menu.Item>
          </div>
          
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="#"
                  onClick={logoutClickHandler}
                  className={classNames(
                    active
                      ? "bg-green-100 text-gray-900"
                      : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  Logout
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>