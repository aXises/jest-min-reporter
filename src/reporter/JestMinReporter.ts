import type { Context } from "@jest/reporters";
import { BaseReporter } from "@jest/reporters";
import type { AggregatedResult } from "@jest/test-result";
import type { Config } from "@jest/types";
import {
    printFailedSuites,
    printFailedTestDiffs,
    printHeaderOnComplete,
    printHeaderOnStart,
    printPassedSuites,
    printSummary,
    printUncheckedSnapshotsSummary,
} from "./utils";

export type ReporterOptions = {
    diffs: boolean;
    colours: boolean;
};

export class JestMinReporter extends BaseReporter {
    protected globalConfig: Config.ConfigGlobals;
    protected options: ReporterOptions;

    public constructor(
        globalConfig: Config.ConfigGlobals,
        options: Partial<ReporterOptions>
    ) {
        super();
        this.globalConfig = globalConfig;
        this.options = {
            diffs: options.diffs || false,
            colours: options.colours || false,
        };
        global.reporterGlobals = { coloursEnabled: this.options.colours };
    }

    public onRunStart() {
        printHeaderOnStart();
    }

    public onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
        printHeaderOnComplete();

        printPassedSuites(results);

        this.options.diffs && printFailedTestDiffs(results);

        printFailedSuites(results);

        results.snapshot.failure &&
            printUncheckedSnapshotsSummary(results.snapshot);

        printSummary(results);
    }
}
