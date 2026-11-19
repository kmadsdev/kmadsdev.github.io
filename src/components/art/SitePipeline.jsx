// CI/CD chapter: the workflow of this site. The same rail as the deploy job of
// consignado-api (Pipeline.jsx), smaller: stage names only.
// Still picture: the live check runs, the five stages before it are done.
import { Rail } from './Pipeline.jsx';

export default function SitePipeline() {
    return <Rail id="sitePipeline" rest="verify" />;
}
