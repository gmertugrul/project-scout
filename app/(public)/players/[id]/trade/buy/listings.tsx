import { NftContract, NftListing, nftListings, User } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { and, eq, sql } from "drizzle-orm";
import Big from "big.js";
import { currencyFormat } from "@/app/lib/helpers";
import { ReactNode } from "react";
import {
  BuyListingFormWrapper,
  CancelListingFormWrapper,
} from "@/app/(public)/players/[id]/trade/buy/form-listing";
import { getSessionUser } from "@/app/lib/auth";
import { cookies } from "next/headers";

export async function Listings({
  nftContract,
  hideOnEmpty = false,
}: {
  nftContract: NftContract;
  hideOnEmpty?: boolean;
}) {
  const user = await getSessionUser(cookies());
  const db = await getDb();

  const listings = await db
    .select()
    .from(nftListings)
    .where(
      and(
        eq(nftListings.nftContractId, nftContract.id),
        eq(nftListings.status, "active"),
      ),
    )
    .orderBy(sql`${nftListings.userId} <> ${user?.id ?? 0}`, nftListings.price);

  if (!listings.length && hideOnEmpty) return null;

  return (
    <div>
      <h3 className="h3 ml-4 mb-2">Currently on Sale</h3>

      {!listings.length ? (
        <p className="card text-center text-sm text-gray-500">
          This player does not have listings available. Please check back later.
        </p>
      ) : null}

      <ListingContainer>
        {listings.map((l) => (
          <ListingItem nftListing={l} key={l.id} user={user} />
        ))}
      </ListingContainer>
    </div>
  );
}

function ListingContainer({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

async function ListingItem({
  nftListing,
  user,
}: {
  nftListing: NftListing;
  user?: User;
}) {
  return (
    <div className="card py-3 relative flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 15 15"
      >
        <path
          fill="#00452C"
          d="M14.54 6.108H7.942V2.544a2.911 2.911 0 012.46 2.873.45.45 0 10.899 0 3.808 3.808 0 00-3.804-3.805.45.45 0 00-.45.45v4.051h-6C1.69 3.135 4.336.9 7.496.9a.45.45 0 000-.9C3.364 0 0 3.365 0 7.5v.942c0 .246.199.45.45.45h6.597v4.051a.45.45 0 10.9 0v-4.05h6.001c-.638 2.972-3.285 5.207-6.445 5.207a.45.45 0 000 .9C11.636 15 15 11.635 15 7.5v-.942a.45.45 0 00-.45-.45h-.01zM.9 7.992V7.5c0-.167.005-.33.02-.492h6.127v.984H.9zm7.047 0v-.984h6.148V7.5c0 .167-.005.33-.021.492H7.947z"
        ></path>
      </svg>

      <span className="text-gray-500 font-light">Price:</span>

      <span className="text-gray-700 font-medium">
        {currencyFormat.format(Big(nftListing.price).toNumber())} USDT
      </span>

      {nftListing.userId == user?.id ? (
        <CancelListingFormWrapper nftListing={nftListing}>
          <button
            type="submit"
            className="absolute top-0 right-0 bottom-0 px-6 bg-orange-700 text-sm font-medium text-white shadow-inner text-center flex items-center"
          >
            Cancel
          </button>
        </CancelListingFormWrapper>
      ) : (
        <BuyListingFormWrapper nftListing={nftListing}>
          <button
            type="submit"
            className="absolute top-0 right-0 bottom-0 px-6 bg-brand-800 text-sm font-medium text-white shadow-inner text-center"
          >
            Buy
          </button>
        </BuyListingFormWrapper>
      )}
    </div>
  );
}
