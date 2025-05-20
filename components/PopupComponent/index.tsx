import { Tooltip } from "react-tooltip";
import { Button } from "@/components/ui/button";
import { ReactElement } from "react";
import "react-tooltip/dist/react-tooltip.css";

function PopupComponent({
  activator,
  content,
}: {
  activator: ReactElement;
  content: ReactElement;
}) {
  return (
    <>
      <a className="cursor-pointer" id="clickable">
        {activator || <Button>Open Popover</Button>}
      </a>
      <Tooltip place="right" anchorSelect="#clickable" clickable>
        <div>
          {content || (
            <div className="px-1 py-2">
              <div className="text-small font-bold">Popover Content</div>
              <div className="text-tiny">This is the popover content</div>
            </div>
          )}
        </div>
      </Tooltip>
    </>
  );
}

export default PopupComponent;
