import Image from "next/image";

export function PlayerHeader() {
  return (
    <header className="flex gap-x-4">
      <Image
        className="rounded w-24 h-24"
        src="/images/player.png"
        width={100}
        height={100}
        alt="Player"
      />

      <div className="flex w-full border-b border-brand-900 border-opacity-10 pb-2">
        <div className="flex flex-col leading-6 justify-between">
          <span className="text-sm text-gray-500 flex items-center">
            <Image
              src="/images/flags/tr.svg"
              alt="Turkey flag"
              className="w-4 h-3 mr-1"
              width={40}
              height={30}
            />
            TUR, 19
          </span>
          <span className="text-sm text-gray-500 mb-1">GALATASARAY</span>
          <span className="font-bold text-gray-700">Mahmut</span>
          <span className="font-bold text-gray-700">Koyuncu</span>
        </div>

        <div className="flex flex-col ml-auto leading-6">
          <span className="font-medium text-gray-500">AM</span>
        </div>
      </div>
    </header>
  );
}
