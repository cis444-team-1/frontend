import {
  ChartLine,
  Ellipsis,
  ExternalLink,
  ListMusic,
  Music,
  Pencil,
  Trash,
  Users,
} from "lucide-react";
import styles from "./styles/page.module.css";
import tableStyles from "./styles/table.module.css";
import { User, users } from "../../types/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/dropdown-menu.tsx/dropdown-menu";
import { Button } from "../../components/button/button";
import Badge from "../../components/badge/badge";
import { AnalyticsCard } from "../../components/analytic-card/card";

export const UsersPage = () => {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.sectionContainer}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>
      <div className={styles.divider} />

      <div className={styles.cardContainer}>
        <AnalyticsCard
          label="Total Users"
          value="1,000"
          icon={<Users color="gray" />}
          color="#202020"
        />
        <AnalyticsCard
          label="New Users"
          value="2,000"
          sublabel="+12% this week"
          icon={<ChartLine color="gray" />}
          color="#202020"
        />
        <AnalyticsCard
          label="Total Playlists"
          value="3,000"
          sublabel="All Time"
          icon={<ListMusic color="gray" />}
          color="#202020"
        />
        <AnalyticsCard
          label="Total Tracks"
          value="4,000"
          sublabel="All Time"
          icon={<Music color="gray" />}
          color="#202020"
        />
      </div>

      <table className={tableStyles.tableContainer}>
        <thead className={tableStyles.tableHead}>
          <tr className={tableStyles.tableHeadRow}>
            <th
              className={`${tableStyles.tableHeader} ${tableStyles.w10} ${tableStyles.paddingLeftRight}`}
            >
              id
            </th>
            <th className={`${tableStyles.tableHeader}`}>name</th>
            <th className={`${tableStyles.tableHeader}`}>email</th>
            <th className={tableStyles.tableHeader}>email verified</th>
            <th className={tableStyles.tableHeader}>role</th>
            <th className={tableStyles.w8}></th>
          </tr>
        </thead>
        <tbody className={tableStyles.tableBody}>
          {users.map((user: User, index: number) => (
            <UserRow user={user} key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

function UserRow({ user }: { user: User }) {
  return (
    <tr className={tableStyles.trackRow}>
      <td className={`${tableStyles.cell} ${tableStyles.indexCell}`}>
        {user.id}
      </td>

      <td className={tableStyles.cell}>{user.username}</td>

      <td className={`${tableStyles.cell} ${tableStyles.truncate}`}>
        {user.email}
      </td>
      <td className={`${tableStyles.cell}`}>
        <Badge
          label="Not Verified"
          size="tiny"
          borderRadius={999}
          color="danger"
        />
      </td>
      <td className={`${tableStyles.cell}`}>admin</td>

      <td className={tableStyles.cell}>
        <div className={tableStyles.menu}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="text" icon={<Ellipsis />} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink /> View
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  );
}
