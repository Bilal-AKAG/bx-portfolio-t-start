import {createFileRoute, Outlet} from '@tanstack/react-router';

export const Route = createFileRoute('/_app')({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<p> This is pathless layout </p>
			<Outlet/>
		</div>
	);
}
