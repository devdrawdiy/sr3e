import { unmount } from "svelte";

/**
 * Base class every actor sheet extends to mount Svelte instead of Foundry's
 * template renderer. `_renderHTML` returns an empty string so ApplicationV2
 * never renders a Handlebars template; the subclass's `_replaceHTML` override
 * mounts a Svelte root into the window content it's given instead. Any Svelte
 * app mounted this way — the main sheet or a header sub-app (e.g. NewsFeed,
 * ShoppingCart) — must be pushed onto `apps` so `_unmountAllApps` can tear it
 * down; ApplicationV2 has no hook for unmounting Svelte on its own.
 */
export class SR3EActorBase extends foundry.applications.sheets.ActorSheetV2 {

    protected apps: Record<string, any>[] = [];

    get title() {
        return this.actor.name;
    }

    protected async _renderHTML(_context: any, _options: DeepPartial<RenderOptions>): Promise<unknown> {
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
        if (this.element) this.element.style.visibility = "hidden";
        return super.close(options);
    }
}
