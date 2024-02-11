import { type Nft, type NftContract, nfts, type Player } from "@/app/db/schema";
import { getDb } from "@/app/db";
import { eq } from "drizzle-orm";
import { NftsMint } from "@/app/admin/players/[id]/nft/nfts.mint";

export async function Nfts({
  contract,
}: {
  player: Player;
  contract: NftContract | null;
}) {
  const db = await getDb();

  let nftList: Nft[] = [];

  if (contract) {
    nftList = await db.query.nfts.findMany({
      where: eq(nfts.nftContractId, contract.id),
      orderBy: [nfts.index],
    });
  }

  return (
    <div className="card relative">
      <div className="card-heading">
        <h4 className="h4">NFTs</h4>
      </div>
      <div className="card-section p-0 max-h-[420 px] overflow-y-auto">
        <table className="table w-full table-fixed table-card">
          <thead className="thead">
            <tr>
              <th className="th w-auto">Index</th>
              <th className="th w-32">Status</th>
              <th className="th w-44 text-right">View</th>
            </tr>
          </thead>
          <tbody className="tbody">
            {!contract ? (
              <tr>
                <td className="td" colSpan={3}>
                  <div className="p-6 text-muted text-center">
                    Contract is not defined yet. Please set up the contract
                    information first.
                  </div>
                </td>
              </tr>
            ) : null}

            {!!contract && !nftList.length ? (
              <tr>
                <td className="td" colSpan={3}>
                  <div className="p-6 text-muted text-center">
                    No NFTs minted yet. You can manually mint one or they will
                    be minted as soon as they are required.
                  </div>
                </td>
              </tr>
            ) : null}

            {nftList.map((x) => (
              <tr key={x.index}>
                <td className="td">#{x.index}</td>
                <td className="td">
                  {x.isInTreasury ? (
                    <span className="pill-green">In Treasury</span>
                  ) : (
                    <span className="pill-primary">On Chain</span>
                  )}
                </td>
                <td className="td text-right">
                  <a href="#">View on Explorer</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!contract ? (
        <div className="card-section">
          <NftsMint contractId={contract.id} />
        </div>
      ) : null}
    </div>
  );
}
