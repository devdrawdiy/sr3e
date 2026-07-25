import { unmount } from "svelte";

/**
 * Item-sheet counterpart to `SR3EActorBase` — same skip-render-then-mount-Svelte
 * pattern via `_renderHTML`/`_replaceHTML`. Also hides the sheet element on
 * close/teardown rather than letting Foundry animate a Handlebars-less window,
 * and blocks native form submission since Svelte components own their own
 * submit flow through the store layer.
 */
export class SR3EItemBase extends foundry.applications.sheets.ItemSheetV2 {
    protected apps: Record<string, any>[] = [];

    get title() {
        return this.item.name;
    }

    protected async _renderHTML(_context: unknown, _options: DeepPartial<RenderOptions>): Promise<unknown> {
        // Skip default template rendering; Svelte takes over in _replaceHTML.
        return "";
    }

    protected _unmountAllApps(): void {
        for (const app of this.apps) {
            unmount(app);
        }
        this.apps = [];
    }

    async close(options?: DeepPartial<foundry.applications.api.ApplicationV2.ClosingOptions>): Promise<this> {
        this._hideSheet();
        return super.close(options);
    }

    protected _tearDown(options: DeepPartial<RenderOptions>): void {
        this._hideSheet();
        this._unmountAllApps();
        super._tearDown(options);
    }

    protected _hideSheet(): void {
        if (this.element) this.element.style.visibility = "hidden";
    }

    protected _onSubmit(_: Event): void {
        // Prevent default form submission
        return;
    }
}
