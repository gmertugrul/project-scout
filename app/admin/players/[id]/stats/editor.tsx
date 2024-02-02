"use client";

import { FormGroup } from "@/app/components/forms";
import { SubmitButton } from "@/app/components/forms.client";
import {
  GoalkeeperStats,
  MentalStats,
  PhysicalStats,
  Player,
  TechnicalStats,
} from "@/app/db/schema";
import { camelCaseToWords } from "@/app/lib/helpers";
import { useFormState } from "react-dom";
import { updatePlayerStats } from "../actions";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export function PlayerStatsEditor({
  player,
  stats,
}: {
  player: Player;
  stats: {
    technicalStats: TechnicalStats;
    mentalStats: MentalStats;
    physicalStats: PhysicalStats;
    goalkeeperStats: GoalkeeperStats;
  };
}) {
  const [state, formAction] = useFormState(updatePlayerStats, null);

  return (
    <div className="card relative">
      <form action={formAction}>
        <input type="hidden" name="id" value={player.id} />
        <div className="space-y-10">
          <h2 className="h2">Player Stats</h2>

          <div className="grid grid-cols-4 gap-10">
            <div>
              <h4 className="h4 leading-8">Goalkeeper</h4>
              <hr />
              <div className="mt-4 space-y-4">
                {Object.keys(stats.goalkeeperStats)
                  .filter((x) => x != "playerId")
                  .map((name) => (
                    <FormGroup key={name} label={camelCaseToWords(name)}>
                      <input
                        name={`goalkeeperStats.${name}`}
                        className="input"
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        defaultValue={
                          (stats.goalkeeperStats as any)[name] ?? ""
                        }
                      />
                    </FormGroup>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="h4 leading-8">Technical</h4>
              <hr className="mb-2" />
              <div className="mt-4 space-y-4">
                {Object.keys(stats.technicalStats)
                  .filter((x) => x != "playerId")
                  .map((name) => (
                    <FormGroup key={name} label={camelCaseToWords(name)}>
                      <input
                        name={`technicalStats.${name}`}
                        className="input"
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        defaultValue={(stats.technicalStats as any)[name] ?? ""}
                      />
                    </FormGroup>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="h4 leading-8">Mental</h4>
              <hr />
              <div className="mt-4 space-y-4">
                {Object.keys(stats.mentalStats)
                  .filter((x) => x != "playerId")
                  .map((name) => (
                    <FormGroup key={name} label={camelCaseToWords(name)}>
                      <input
                        name={`mentalStats.${name}`}
                        className="input"
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        defaultValue={(stats.mentalStats as any)[name] ?? ""}
                      />
                    </FormGroup>
                  ))}
              </div>
            </div>
            <div>
              <h4 className="h4 leading-8">Physical</h4>
              <hr />
              <div className="mt-4 space-y-4">
                {Object.keys(stats.physicalStats)
                  .filter((x) => x != "playerId")
                  .map((name) => (
                    <FormGroup key={name} label={camelCaseToWords(name)}>
                      <input
                        name={`physicalStats.${name}`}
                        className="input"
                        type="number"
                        min={0}
                        max={20}
                        step={1}
                        defaultValue={(stats.physicalStats as any)[name] ?? ""}
                      />
                    </FormGroup>
                  ))}
              </div>
            </div>
          </div>

          <hr />

          {state?.success ? (
            <div className="rounded-md bg-green-100 p-4 flex gap-2 items-center">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              Changes saved
            </div>
          ) : null}

          <div className="flex gap-x-6 items-center justify-end">
            <button className="btn-text" type="reset">
              Cancel
            </button>

            <SubmitButton>Save</SubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
