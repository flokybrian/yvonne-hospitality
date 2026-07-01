import Button from "@/components/common/Button";

import { siteContent } from "@/data/siteContent";

export default function CTAButtons(){

    return(

        <div className="cta-buttons">

            <Button>

                {siteContent.cta.primaryButton}

            </Button>

            <Button variant="outline">

                {siteContent.cta.secondaryButton}

            </Button>

        </div>

    );

}