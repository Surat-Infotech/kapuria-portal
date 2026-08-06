import { Button } from "@/components/ui/button";

export default function testing() {
  return (
    <>
      <div className="flex flex-wrap items-center gap-12 p-24">
        <Button>Update password</Button>
        <Button variant="secondary">Blueprints</Button>
        <Button variant="soft">Pay Now</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="link">Clear</Button>
      </div>

      <div className="flex flex-wrap items-center gap-12 p-24">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Sign in</Button>
        <Button disabled>Disabled</Button>
      </div>

      <div className="w-264 rounded-xl bg-navy-800 p-16">
        <Button variant="ghost" width="full">
          My Properties
        </Button>
        <Button variant="outline" width="full" className="mt-8">
          Log out
        </Button>
      </div>

      <Button width="full" size="lg" className="mt-24">
        Full width
      </Button>
    </>
  );
}
