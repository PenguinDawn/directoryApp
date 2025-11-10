

import { APPWRITE_CONFIG, createAppWriteService } from "@/lib/appwrite";
import { useMemo, useState } from "react";
import { Models, Query } from "react-native-appwrite";

export interface MemberRow extends Models.Row {
  name: string;
  userID: string;
  club?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  showEmail?: boolean | undefined;
  showPhone?: boolean | undefined;
  office?: string | undefined;
  classification?: string | undefined;
  imgsrc?: string | undefined;
}
// how our events look like
export interface EventRow extends Models.Row {
  title: string;
  club?: string | undefined;
  location?: string | undefined;
  date?: string | undefined;
  time?: string | undefined;
  description?: string | undefined;
}

      const appwriteService = useMemo(
        () => createAppWriteService(APPWRITE_CONFIG),
        []
      );

    const [loading, setLoading] = useState(true)

    export const getMembers = async (club:string | undefined) => {
        if (club == undefined) {
            return;
        }
            try {
            const response = await appwriteService.tables.listRows<MemberRow>({
                databaseId: APPWRITE_CONFIG.databaseId,
                tableId: APPWRITE_CONFIG.membersTableId,
                queries: [Query.equal("club", club)],
            });
            return response.rows?? null;
            }
            finally {
                setLoading(false);
            }
        }

         export const getEvents = async () => {
            try {
            const response = await appwriteService.tables.listRows<EventRow>({
                databaseId: APPWRITE_CONFIG.databaseId,
                tableId: APPWRITE_CONFIG.eventsTableId,
                queries: [Query.isNotNull("title")],
            });
            return response.rows?? null;
            }
            finally {
                setLoading(false);
            }
        }

