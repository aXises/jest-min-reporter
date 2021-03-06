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
} from "../utils";

export type ReporterOptions = {
    diffs: boolean;
    colours: boolean;
    showPassingTests: boolean;
};

export class JestCompactReporter extends BaseReporter {
    protected globalConfig: Config.ConfigGlobals;
    protected options: ReporterOptions;

    public constructor(
        globalConfig: Config.ConfigGlobals,
        options: Partial<ReporterOptions>
    ) {
        super();
        this.globalConfig = globalConfig;
        this.options = {
            diffs: options.diffs === undefined ? true : options.diffs,
            colours: options.colours === undefined ? true : options.colours,
            showPassingTests:
                options.showPassingTests === undefined
                    ? false
                    : options.showPassingTests,
        };
        global.reporterGlobals = { coloursEnabled: this.options.colours };
    }

    public onRunStart() {
        printHeaderOnStart();
    }

    public onRunComplete(contexts: Set<Context>, results: AggregatedResult) {
        printHeaderOnComplete();

        printPassedSuites(results, this.options.showPassingTests);

        this.options.diffs && printFailedTestDiffs(results);

        printFailedSuites(results, this.options.showPassingTests);

        results.snapshot.failure &&
            printUncheckedSnapshotsSummary(results.snapshot);

        printSummary(results);
    }
}
