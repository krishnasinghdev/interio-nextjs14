"use client"

import { useEffect } from "react"
import { useAppDispatch } from "@/context/hook"
import { panelFor, setLogin, setLogout, showPanel as SP, togglePanel } from "@/context/theme"
import { useMediaQuery } from "@/utils"
import { useSelector } from "react-redux"

import { revalidateVendor } from "@/lib/actions/vendor.actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer"
import Invite from "@/components/invite"
import Collection from "@/components/new-collection"
import SignInForm from "@/components/signin"
import SignUpForm from "@/components/signup"

export default function ExtraComponents() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const dispatch = useAppDispatch()
  const showPanel = useSelector(SP)
  const panel = useSelector(panelFor)

  const checkLogin = async () => {
    try {
      const vendor = await revalidateVendor()
      vendor && vendor.code === 200 && dispatch(setLogin(vendor))
    } catch (error) {
      dispatch(setLogout())
      console.log("Some Error!", error)
    }
  }

  useEffect(() => {
    checkLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isDesktop) {
    return (
      <Dialog open={showPanel} onOpenChange={() => dispatch(togglePanel("HIDE"))}>
        <DialogContent className="sm:max-w-[425px]">
          {(panel === "signin" && <SignInForm />) ||
            (panel === "signup" && <SignUpForm />) ||
            (panel === "invite" && <Invite />) ||
            (panel === "collection" && <Collection />)}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={showPanel} onDrag={() => dispatch(togglePanel("HIDE"))}>
      <DrawerContent className="pb-6">
        {(panel === "signin" && <SignInForm />) ||
          (panel === "signup" && <SignUpForm />) ||
          (panel === "invite" && <Invite />) ||
          (panel === "collection" && <Collection />)}
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => dispatch(togglePanel("HIDE"))}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
